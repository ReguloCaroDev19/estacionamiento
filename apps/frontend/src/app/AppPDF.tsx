import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Oswald',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  items: {
    marginLeft: 10,
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
export const AppPDF = (data: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.data
          ? data.data.map((a: any, index: any) => {
              return (
                <View key={a._id}>
                  <View style={styles.section}>
                    <View style={styles.item}>
                      <Text>Placa:</Text>
                      <Text style={styles.items}>{a.placa}</Text>
                    </View>
                    <View style={styles.item}>
                      <Text>Vehiculo:</Text>
                      <Text style={styles.items}>{a.residente}</Text>
                    </View>
                    <View style={styles.item}>
                      <Text>Entrada:</Text>
                      <Text style={styles.items}>
                        {new Date(a.entrada).toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text>Salida:</Text>
                      <Text style={styles.items}>
                        {new Date(a.salida).toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text>Cobro:</Text>
                      <Text style={styles.items}>${a.cobro}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          : null}
      </Page>
    </Document>
  );
};
