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
        marginBottom: 7,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        fontWeight: "normal",
        backgroundColor: "wheat",
    },
    "p:empty": {
        marginBottom: 7,
        minHeight: 20,
        width: "100%",
    },
    span: {
        lineHeight: 1.5,
    },
    h1: {
        marginBottom: 7,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        counterIncrement: "h1",
        counterReset: "h2",
    },
    h2: {
        marginBottom: 7,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        counterIncrement: "h2",
        counterReset: "h3",
    },
    h3: {
        marginBottom: 7,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        counterIncrement: "h3",
    },
    h4: {
        marginBottom: 7,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        backgroundColor: "tomato",
    },
    h5: {
        marginBottom: 7,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
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
        marginBottom: "9pt",
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
    },
    td: {
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        padding: 6.5,
        verticalAlign: "center",
    },
    th: {
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        borderTop: "1px solid #000",
        padding: 6.5,
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
    },
    li: {
        paddingLeft: 10,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
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
