// DecorativeDecoration.ts
import { Extension } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

interface IPaginationPlusOptions {
    pageHeight: number;
    pageGap: number;
    pageBreakBackground: string;
    pageGapBorderSize: number;
    footerRight: string;
    footerLeft: string;
    headerRight: string;
    headerLeft: string;
    headerHeight: number;
}

const pagination_meta_key = "PAGINATION_META_KEY";

export const PaginationPlus = Extension.create<IPaginationPlusOptions>({
    name: "PaginationPlus",
    addOptions() {
        return {
            pageHeight: 800,
            pageGap: 50,
            pageGapBorderSize: 1,
            pageBreakBackground: "#ffffff",
            headerHeight: 10,
            footerRight: "{page}",
            footerLeft: "",
            headerRight: "",
            headerLeft: "",
        };
    },
    onCreate() {
        const targetNode = this.editor.view.dom;
        targetNode.classList.add("rm-with-pagination");
        const config = { attributes: true };
        const _headerHeight = this.options.headerHeight;

        const _pageHeight = this.options.pageHeight - _headerHeight * 2;

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
            .rm-with-pagination .rm-page-break.last-page ~ .rm-page-break {
                display: none;
            }
            .rm-with-pagination .rm-page-break.last-page .rm-pagination-gap {
                display: none;
            }
            .rm-with-pagination .rm-page-break.last-page .rm-page-header {
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
                outline: 1px solid tomato;
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

        const _pageGap = this.options.pageGap;
        const _pageGapBorderSize = this.options.pageGapBorderSize;

        const refreshPage = (node: HTMLElement) => {
            const target = Array.from(node.children).find(child => child.id === "pages");
            if (!target) return;

            const pageElements = [...target.querySelectorAll(".page")] as HTMLElement[];
            const contentElements = Array.from(
                node.querySelectorAll(".ProseMirror > *")
            ) as HTMLElement[];

            const pageTops = pageElements.map(el => el.offsetTop).filter(top => top !== 0);

            pageTops.push(Infinity); // to simplify range check for last page

            const pagesWithContent = new Set();

            contentElements.forEach(el => {
                const top = el.offsetTop;
                for (let j = 0; j < pageTops.length - 1; j++) {
                    if (top >= pageTops[j] && top < pageTops[j + 1]) {
                        pagesWithContent.add(j + 1);
                        break;
                    }
                }
            });

            const maxPage =
                pagesWithContent.size > 0
                    ? Math.max(...Array.from(pagesWithContent as Set<number>))
                    : 0;

            const _maxPage = maxPage + 1;

            targetNode.style.height = `${
                _maxPage * this.options.pageHeight +
                (_maxPage - 1) * (_pageGap + 2 * _pageGapBorderSize)
            }px`;

            if (maxPage in target.children) {
                target.children[maxPage].classList.add("last-page");
            }
        };

        let rafId = 0;
        const callback = (mutationList: MutationRecord[]) => {
            if (mutationList.length > 0 && mutationList[0].target) {
                const _target = mutationList[0].target as HTMLElement;
                if (_target.classList.contains("rm-with-pagination")) {
                    cancelAnimationFrame(rafId);
                    rafId = requestAnimationFrame(() => refreshPage(_target));
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(targetNode, config);

        refreshPage(targetNode);

        this.editor.view.dispatch(this.editor.view.state.tr.setMeta(pagination_meta_key, true));
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
                        // Recalculate only on doc changes

                        if (tr.docChanged || tr.getMeta(pagination_meta_key)) {
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

function createDecoration(state: EditorState, pageOptions: IPaginationPlusOptions): Decoration[] {
    const pageWidget = Decoration.widget(
        0,
        view => {
            const _extraPages = 2;
            const _pageGap = pageOptions.pageGap;
            const _headerHeight = pageOptions.headerHeight;
            const _pageHeight = pageOptions.pageHeight - _headerHeight * 2;
            const _pageBreakBackground = pageOptions.pageBreakBackground;
            const _pageGapBorderSize = pageOptions.pageGapBorderSize;

            // const childElements = view.dom.children;

            const editorContent = view.dom as HTMLElement;
            const children = Array.from(editorContent.children).slice(2, -1);
            const first = children[0];
            const last = children[children.length - 1];

            let totalHeight = 0;
            if (first && last) {
                const start = first.getBoundingClientRect().top;
                const end = last.getBoundingClientRect().bottom;
                totalHeight = end - start;
            }

            // for (let i = 2; i < childElements.length - 1; i++) {
            //     totalHeight += childElements[i].scrollHeight;
            // }

            const paginationElement = document.querySelector("[data-rm-pagination]");

            let previousPageCount = paginationElement ? paginationElement.children.length : 0;

            previousPageCount =
                previousPageCount > _extraPages ? previousPageCount - _extraPages : 0;

            const totalPageGap = _pageGap + _headerHeight * 2 + _pageGapBorderSize * 2;

            const actualPageContentHeight = totalHeight - previousPageCount * totalPageGap;

            let pages = Math.ceil(actualPageContentHeight / _pageHeight);
            pages = pages > 0 ? pages - 1 : 0;

            const el = document.createElement("div");
            el.dataset.rmPagination = "true";

            const pageBreakDefinition = (pageIndex: number) => {
                const pageContainer = document.createElement("div");
                pageContainer.classList.add("rm-page-break");
                pageContainer.dataset.pageIndex = `${pageIndex}`;

                const page = document.createElement("div");
                page.classList.add("page");
                page.style.position = "relative";
                page.style.float = "left";
                page.style.clear = "both";
                page.style.marginTop = `calc(${_headerHeight}px + ${_pageHeight}px)`;

                const pageBreak = document.createElement("div");
                pageBreak.classList.add("breaker");
                pageBreak.style.width = `100%`;
                pageBreak.style.position = "relative";
                pageBreak.style.float = "left";
                pageBreak.style.clear = "both";
                pageBreak.style.left = "0px";
                pageBreak.style.right = "0px";
                pageBreak.style.zIndex = "2";

                const pageFooter = document.createElement("div");
                pageFooter.classList.add("rm-page-footer");
                pageFooter.style.height = _headerHeight + "px";

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
                pageHeader.style.height = _headerHeight + "px";

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

            const fragment = document.createDocumentFragment();

            for (let i = 0; i < pages + _extraPages; i++) {
                const pageElement = pageBreakDefinition(i + 1);
                fragment.appendChild(pageElement);
            }

            el.append(fragment);
            el.id = "pages";
            return el;
        },
        { side: -1 }
    );

    const firstHeaderWidget = Decoration.widget(
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

            el.style.height = `${pageOptions.headerHeight}px`;
            return el;
        },
        { side: -1 }
    );

    const lastFooterWidget = Decoration.widget(
        state.doc.content.size,
        () => {
            const el = document.createElement("div");
            el.style.height = `${pageOptions.headerHeight}px`;
            return el;
        },
        { side: 1 }
    );

    return [pageWidget, firstHeaderWidget, lastFooterWidget];
}
