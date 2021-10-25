import { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

//styling pdf component
const styles = StyleSheet.create({
  page: { padding: 10 },
  m20: { marginTop: "20px" },
  date: { textAlign: "right", fontSize: "14px" },
  billStyle: {
    border: "2px dotted black",
    padding: 20,
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: "100px",
    height: "80px",
    backgroundColor: "#ebebeb",
    borderRadius: "5px",
  },
  itemHeader: { display: "flex", flexDirection: "row", marginBottom: "2px" },
  itemTitle: {
    width: "25%",
    backgroundColor: "#232323",
    padding: "8px",
    color: "white",
    margin: "0 2px 0 0",
    fontSize: "16px",
    borderRadius: "3px",
  },
  itemData: {
    width: "25%",
    padding: "5px",
    margin: "0px 2px 0px 0px",
    border: "2px solid whitesmoke",
    fontSize: "14px",
  },
  billNames: {
    fontStyle: "italic",
    opacity: ".8",
    lineHeight: "1.5px",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: "20px",
    justifyContent: "flex-end",
    opacity: ".8",
    width: "100%",
  },
  results: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  noteBox: {
    fontSize: "14px",
  },
});

//renderDocument main function
function RenderDocument({
  invoiceInputData,
  invoiceItemData,
  invoiceResultData,
}) {
  const { billFrom, billTo, invoiceNo, dt, dueDate, logoURL } =
    invoiceInputData[0];
  const { subTotal, total, discount, tax, notes, amtPaid, blcDue } =
    invoiceResultData[0];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logoURL} alt="logo" style={styles.logo} />

          <View style={styles.results}>
            <Text style={styles.date}>Date: {dt}</Text>
            <Text style={styles.date}>DueDate: {dueDate}</Text>
          </View>
        </View>

        <Text style={styles.m20}> Invoice: {invoiceNo} </Text>
        <View style={styles.billStyle}>
          <Text>
            <span style={styles.billNames}> From:</span> &nbsp;
            {billFrom}
          </Text>
          <Text>
            <span style={styles.billNames}>To:</span>&nbsp;
            {billTo}
          </Text>
        </View>

        <View style={[styles.itemHeader, styles.m20]}>
          <Text style={styles.itemTitle}>Name</Text>
          <Text style={styles.itemTitle}>Quantity</Text>
          <Text style={styles.itemTitle}>Rate</Text>
          <Text style={styles.itemTitle}>Amount</Text>
        </View>
        {invoiceItemData.map((item, id) => (
          <View key={id} style={[styles.itemHeader]}>
            <Text style={styles.itemData}>{item.title}</Text>
            <Text style={styles.itemData}>{item.qty}</Text>
            <Text style={styles.itemData}>{item.rate}</Text>
            <Text style={styles.itemData}>{item.amt}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <View style={styles.results}>
            <Text>
              <span style={styles.billNames}> SubTotal:</span> &nbsp; Rs.
              {subTotal}
            </Text>
            <Text>
              <span style={styles.billNames}> Discount:</span> &nbsp; {discount}
              %
            </Text>
            <Text>
              <span style={styles.billNames}> Tax:</span> &nbsp; {tax}%
            </Text>
            <Text>
              <span style={styles.billNames}> Total:</span> &nbsp; Rs.{total}
            </Text>
            <Text>
              <span style={styles.billNames}> Amount Paid:</span> &nbsp; Rs.
              {amtPaid}
            </Text>
            <Text>
              <span style={styles.billNames}> Balance Due:</span> &nbsp; Rs.
              {blcDue}
            </Text>
          </View>
        </View>
        <View style={styles.noteBox}>
          <Text>{notes}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default RenderDocument;
