import { Extension } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";

interface IPaginationPlusOptions {
    pageHeight: number;
    pageGap: number;
    pageBreakBackground: string;
    pageHeaderHeight: number;
    pageFooterHeight: number;
    pageGapBorderSize: number;
    footerRight: string;
    footerLeft: string;
    headerRight: string;
    headerLeft: string;
}

const page_count_meta_key = "PAGE_COUNT_META_KEY";

export const PaginationPlus = Extension.create<IPaginationPlusOptions>({
    name: "PaginationPlus",
    addOptions() {
        return {
            pageHeight: 1123,
            pageGap: 50,
            pageGapBorderSize: 1,
            pageBreakBackground: "#ffffff",
            pageHeaderHeight: 113.39,
            pageFooterHeight: 75.59,
            footerRight: "{page}",
            footerLeft: "",
            headerRight: "",
            headerLeft: "",
        };
    },
    onCreate() {
        const targetNode = this.editor.view.dom;
        targetNode.classList.add("rm-with-pagination");

        // Cache para evitar recálculos desnecessários
        let lastPageCount = 0;
        let isUpdating = false;
        let updateTimeout: NodeJS.Timeout | null = null;

        const _pageHeaderHeight = this.options.pageHeaderHeight;
        const _pageFooterHeight = this.options.pageFooterHeight;
        const _pageHeight = this.options.pageHeight - _pageHeaderHeight - _pageFooterHeight;

        const style = document.createElement("style");
        style.dataset.rmPaginationStyle = "";

        style.textContent = `
            .rm-with-pagination {
                counter-reset: page-number;
            }
            .rm-with-pagination .rm-page-footer {
                counter-increment: page-number;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .rm-with-pagination .rm-page-break:last-child .rm-pagination-gap {
                display: none;
            }
            .rm-with-pagination .rm-page-break:last-child .rm-page-header {
                display: none;
            }
            
            .rm-with-pagination table tr td,
            .rm-with-pagination table tr th {
                word-break: break-all;
            }
            .rm-with-pagination table > tr {
                display: grid;
                min-width: 100%;
            }
            .rm-with-pagination table {
                border-collapse: collapse;
                width: 100%;
                display: contents;
            }
            .rm-with-pagination table tbody{
                display: table;
                max-height: 300px;
                overflow-y: auto;
            }
            .rm-with-pagination table tbody > tr{
                display: table-row !important;
            }
            .rm-with-pagination p:has(br.ProseMirror-trailingBreak:only-child) {
                display: table;
                width: 100%;
            }
            .rm-with-pagination .table-row-group {
                max-height: ${_pageHeight}px;
                overflow-y: auto;
                width: 100%;
            }
            .rm-with-pagination .rm-page-footer-left,
            .rm-with-pagination .rm-page-footer-right,
            .rm-with-pagination .rm-page-header-left,
            .rm-with-pagination .rm-page-header-right {
                display: inline-block;
            }

            .rm-with-pagination .rm-page-header-left,
            .rm-with-pagination .rm-page-footer-left{
                float: left;
            }
            .rm-with-pagination .rm-page-header-right,
            .rm-with-pagination .rm-page-footer-right{
                float: right;
            }
            .rm-with-pagination .rm-page-number::before {
                content: counter(page-number);
            }
            .rm-with-pagination .rm-first-page-header{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
            }

            .rm-with-pagination .rm-page-header{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
            }
        `;

        document.head.appendChild(style);

        const refreshPage = (targetedNode: HTMLElement) => {
            if (isUpdating) return;

            const paginationElement = targetedNode.querySelector("[data-rm-pagination]");
            if (paginationElement) {
                const lastPageBreak = paginationElement.lastElementChild?.querySelector(
                    ".breaker"
                ) as HTMLElement;

                if (lastPageBreak) {
                    const minHeight = lastPageBreak.offsetTop + lastPageBreak.offsetHeight;
                    targetedNode.style.minHeight = `${minHeight}px`;
                }
            }
        };

        const debouncedUpdate = () => {
            if (updateTimeout) {
                clearTimeout(updateTimeout);
            }

            updateTimeout = setTimeout(() => {
                if (isUpdating) return;

                isUpdating = true;

                try {
                    const currentPageCount = getExistingPageCount(this.editor.view);
                    const newPageCount = calculatePageCount(this.editor.view, this.options);

                    if (
                        Math.abs(currentPageCount - newPageCount) > 0 &&
                        newPageCount !== lastPageCount
                    ) {
                        lastPageCount = newPageCount;

                        const tr = this.editor.view.state.tr.setMeta(
                            page_count_meta_key,
                            Date.now()
                        );
                        this.editor.view.dispatch(tr);
                    }

                    refreshPage(targetNode);
                } finally {
                    isUpdating = false;
                }
            }, 100); // Debounce de 100ms
        };

        const callback = (mutationList: MutationRecord[]) => {
            // Filtra apenas mutações relevantes para evitar processamento desnecessário
            const relevantMutations = mutationList.filter(mutation => {
                if (mutation.type === "childList") {
                    // Ignora mudanças em elementos de paginação para evitar loop
                    const target = mutation.target as HTMLElement;
                    if (
                        target.hasAttribute("data-rm-pagination") ||
                        target.closest("[data-rm-pagination]") ||
                        target.classList.contains("rm-page-break") ||
                        target.classList.contains("breaker")
                    ) {
                        return false;
                    }
                    return true;
                }

                if (mutation.type === "attributes") {
                    // Ignora mudanças de estilo que não afetam conteúdo
                    if (mutation.attributeName === "style" || mutation.attributeName === "class") {
                        return false;
                    }
                    return true;
                }

                return false;
            });

            if (relevantMutations.length > 0) {
                debouncedUpdate();
            }
        };

        // Observer mais específico para evitar excesso de eventos
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, {
            childList: true,
            subtree: true,
            attributes: false, // Removido attributes: true que causava muitos eventos
            characterData: true,
        });

        // Inicialização
        refreshPage(targetNode);
        lastPageCount = getExistingPageCount(this.editor.view);
    },

    addProseMirrorPlugins() {
        const pageOptions = this.options;
        return [
            new Plugin({
                key: new PluginKey("pagination"),
                state: {
                    init(_, state) {
                        const widgetList = createDecoration(state, pageOptions);
                        return DecorationSet.create(state.doc, widgetList);
                    },
                    apply(tr, oldDeco, oldState, newState) {
                        // Só recria decorations se realmente houver mudança no documento
                        // ou se for especificamente um update de paginação
                        if (tr.docChanged || tr.getMeta(page_count_meta_key)) {
                            const widgetList = createDecoration(newState, pageOptions);
                            return DecorationSet.create(newState.doc, [...widgetList]);
                        }
                        return oldDeco;
                    },
                },
                props: {
                    decorations(state: EditorState) {
                        return this.getState(state) as DecorationSet;
                    },
                },
            }),
        ];
    },
});

const getExistingPageCount = (view: EditorView) => {
    const editorDom = view.dom;
    const paginationElement = editorDom.querySelector("[data-rm-pagination]");
    if (paginationElement) {
        return paginationElement.children.length;
    }
    return 0;
};

const calculatePageCount = (view: EditorView, pageOptions: IPaginationPlusOptions): number => {
    const editorDom = view.dom as HTMLElement;
    const pageContentAreaHeight =
        pageOptions.pageHeight - pageOptions.pageHeaderHeight - pageOptions.pageFooterHeight;
    const paginationElement = editorDom.querySelector("[data-rm-pagination]") as HTMLElement | null;
    const currentPageCount = getExistingPageCount(view);

    const marker = editorDom.querySelector("[data-end-of-content]") as HTMLElement | null;

    if (!marker) {
        const editorHeight = editorDom.scrollHeight;
        const pageCount = Math.ceil(editorHeight / pageContentAreaHeight);
        return pageCount <= 0 ? 1 : pageCount;
    }

    const contentBottom = marker
        ? marker.getBoundingClientRect().bottom
        : editorDom.getBoundingClientRect().bottom;

    if (paginationElement) {
        const lastPageBreak = paginationElement.lastElementChild?.querySelector(
            ".breaker"
        ) as HTMLElement | null;
        const rootEl = editorDom.closest("[data-editor-root]") as HTMLElement;

        if (lastPageBreak && rootEl) {
            const zoom = Number(getComputedStyle(rootEl).zoom) || 1; // Fallback para zoom
            const lastBreakBottom = lastPageBreak.getBoundingClientRect().bottom;
            const lastPageGap = contentBottom - lastBreakBottom;
            const newLastPageGap = lastPageGap / zoom;

            if (newLastPageGap > 0) {
                return currentPageCount + Math.ceil(newLastPageGap / pageContentAreaHeight);
            } else {
                const lpFrom = -pageOptions.pageHeaderHeight;
                const lpTo = -(pageOptions.pageHeight - pageOptions.pageHeaderHeight);

                if (newLastPageGap > lpTo && newLastPageGap < lpFrom) {
                    return currentPageCount;
                } else if (newLastPageGap < lpTo) {
                    const pageHeightOnRemove = pageOptions.pageHeight + pageOptions.pageGap;
                    return (
                        currentPageCount + Math.floor(newLastPageGap / (pageHeightOnRemove / zoom))
                    );
                } else {
                    return currentPageCount;
                }
            }
        }
        return 1;
    } else {
        const editorHeight = editorDom.scrollHeight;
        const pageCount = Math.ceil(editorHeight / pageContentAreaHeight);
        return pageCount <= 0 ? 1 : pageCount;
    }
};

function createDecoration(
    state: EditorState,
    pageOptions: IPaginationPlusOptions,
    isInitial: boolean = false
): Decoration[] {
    const pageWidget = Decoration.widget(
        0,
        view => {
            const _pageGap = pageOptions.pageGap;
            const _pageHeaderHeight = pageOptions.pageHeaderHeight;
            const _pageFooterHeight = pageOptions.pageFooterHeight;
            const _pageHeight = pageOptions.pageHeight - _pageHeaderHeight - _pageFooterHeight;
            const _pageBreakBackground = pageOptions.pageBreakBackground;

            const el = document.createElement("div");
            el.dataset.rmPagination = "true";

            const pageBreakDefinition = ({ firstPage = false }) => {
                const pageContainer = document.createElement("div");
                pageContainer.classList.add("rm-page-break");

                const page = document.createElement("div");
                page.classList.add("page");
                page.style.position = "relative";
                page.style.float = "left";
                page.style.clear = "both";
                page.style.marginTop = firstPage
                    ? `calc(${_pageHeaderHeight}px + ${_pageHeight}px)`
                    : _pageHeight + "px";

                const pageBreak = document.createElement("div");
                pageBreak.classList.add("breaker");
                pageBreak.style.width = "100%";
                pageBreak.style.position = "relative";
                pageBreak.style.float = "left";
                pageBreak.style.clear = "both";
                pageBreak.style.left = "0px";
                pageBreak.style.right = "0px";
                pageBreak.style.zIndex = "2";

                const pageFooter = document.createElement("div");
                pageFooter.classList.add("rm-page-footer");
                pageFooter.style.height = _pageFooterHeight + "px";

                const footerRight = pageOptions.footerRight.replace(
                    "{page}",
                    `<span class="rm-page-number"></span>`
                );
                const footerLeft = pageOptions.footerLeft.replace(
                    "{page}",
                    `<span class="rm-page-number"></span>`
                );

                const pageFooterLeft = document.createElement("div");
                pageFooterLeft.classList.add("rm-page-footer-left");
                pageFooterLeft.innerHTML = footerLeft;

                const pageFooterRight = document.createElement("div");
                pageFooterRight.classList.add("rm-page-footer-right");
                pageFooterRight.innerHTML = footerRight;

                pageFooter.append(pageFooterLeft);
                pageFooter.append(pageFooterRight);

                const pageSpace = document.createElement("div");
                pageSpace.classList.add("rm-pagination-gap");
                pageSpace.style.height = _pageGap + "px";
                pageSpace.style.borderLeft = "1px solid";
                pageSpace.style.borderRight = "1px solid";
                pageSpace.style.position = "relative";
                pageSpace.style.setProperty("width", "calc(100% + 2px)", "important");
                pageSpace.style.left = "-1px";
                pageSpace.style.backgroundColor = _pageBreakBackground;
                pageSpace.style.borderLeftColor = _pageBreakBackground;
                pageSpace.style.borderRightColor = _pageBreakBackground;

                const pageHeader = document.createElement("div");
                pageHeader.classList.add("rm-page-header");
                pageHeader.style.height = _pageHeaderHeight + "px";

                const pageHeaderLeft = document.createElement("div");
                pageHeaderLeft.classList.add("rm-page-header-left");
                pageHeaderLeft.innerHTML = pageOptions.headerLeft;

                const pageHeaderRight = document.createElement("div");
                pageHeaderRight.classList.add("rm-page-header-right");
                pageHeaderRight.innerHTML = pageOptions.headerRight;

                pageHeader.append(pageHeaderLeft, pageHeaderRight);
                pageBreak.append(pageFooter, pageSpace, pageHeader);
                pageContainer.append(page, pageBreak);

                return pageContainer;
            };

            const page = pageBreakDefinition({ firstPage: false });
            const firstPage = pageBreakDefinition({ firstPage: true });
            const fragment = document.createDocumentFragment();
            const pageCount = calculatePageCount(view, pageOptions);

            for (let i = 0; i < pageCount; i++) {
                if (i === 0) {
                    fragment.appendChild(firstPage.cloneNode(true));
                } else {
                    fragment.appendChild(page.cloneNode(true));
                }
            }

            el.append(fragment);
            el.id = "pages";
            return el;
        },
        { side: -1 }
    );

    const headerWidget = Decoration.widget(
        0,
        () => {
            const el = document.createElement("div");
            el.style.position = "relative";
            el.classList.add("rm-first-page-header");

            const pageHeaderLeft = document.createElement("div");
            pageHeaderLeft.classList.add("rm-first-page-header-left");
            pageHeaderLeft.innerHTML = pageOptions.headerLeft;
            el.append(pageHeaderLeft);

            const pageHeaderRight = document.createElement("div");
            pageHeaderRight.classList.add("rm-first-page-header-right");
            pageHeaderRight.innerHTML = pageOptions.headerRight;
            el.append(pageHeaderRight);

            el.style.height = `${pageOptions.pageHeaderHeight}px`;
            return el;
        },
        { side: -1 }
    );

    const endMarker = Decoration.widget(
        state.doc.content.size,
        () => {
            const el = document.createElement("span");
            el.dataset.endOfContent = "true";
            el.style.position = "static";
            el.style.opacity = "0";
            return el;
        },
        { side: 1 }
    );

    return !isInitial ? [pageWidget, headerWidget, endMarker] : [pageWidget, endMarker];
}
