import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { ReactElement } from "react";
import Html from "react-pdf-html";

const styles = StyleSheet.create({
    body: {
        paddingTop: "3cm",
        paddingRight: "2cm",
        paddingBottom: "2cm",
        paddingLeft: "3cm",
    },
});

const stylesheet = {
    "> p": {
        marginBottom: 9,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        fontWeight: "normal",
        minHeight: 17.21,
    },
    h1: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        counterIncrement: "h1",
        counterReset: "h2",
    },
    h2: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        counterIncrement: "h2",
        counterReset: "h3",
    },
    h3: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        counterIncrement: "h3",
    },
    h4: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    h5: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    h6: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    "h1::before": {
        content: `counter(h1) ". "`,
    },
    "h2::before": {
        content: `counter(h1) "." counter(h2) ". "`,
    },
    "h3::before": {
        content: `counter(h1) "." counter(h2) "." counter(h3) ". "`,
    },
    table: {
        borderCollapse: "collapse",
        overflow: "hidden",
        tableLayout: "fixed",
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    "table td": {
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        boxSizing: "border-box",
        padding: 6.6,
        position: "relative",
        verticalAlign: "center",
    },
    "table th": {
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        borderTop: "1px solid #000",
        boxSizing: "border-box",
        padding: 6.6,
        position: "relative",
        verticalAlign: "center",
        fontWeight: "bold",
    },
    "table td:first-of-type": {
        borderLeft: "1px solid #000",
    },
    "table th:first-of-type": {
        borderLeft: "1px solid #000",
    },
    ul: {
        marginTop: 0,
        marginBottom: 12,
        paddingLeft: 22,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        gap: 10,
    },
    ol: {
        marginTop: 0,
        marginBottom: 12,
        paddingLeft: 22,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    li: {
        paddingLeft: 10,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
};

interface IMyDocProps {
    html: string;
}

export const DocumentDownload = ({ html }: IMyDocProps): ReactElement => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Html resetStyles stylesheet={stylesheet}>
                {html}
            </Html>
        </Page>
    </Document>
);
