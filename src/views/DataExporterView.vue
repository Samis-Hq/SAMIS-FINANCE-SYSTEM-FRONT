<template>
  <div class="export-container">

    <div class=" export-buttons-top">
      <button @click="previewPDF" class="export-btn preview-btn">
        <EyeIcon class="button-icon"/>
        <span>Preview</span>
      </button>
      <button @click="exportToPDF" class="export-btn pdf-btn">
        <ArrowDownTrayIcon class="button-icon"/>
        <span> PDF</span>
      </button>
      <button @click="exportToCSV" class="export-btn csv-btn">
        <DocumentArrowDownIcon class="button-icon"/>
        <span> CSV</span>
      </button>
      <button @click="printPDF" class="export-btn print-btn">
        <PrinterIcon class="button-icon"/>
        <span>Print</span>
      </button>
    </div>


    <div class="flex md:hidden gap-4">
      <button @click="printPDF" class="export-btn print-btn">
        <PrinterIcon class="button-icon"/>
        <span>Print</span>
      </button>
      <button @click="exportToCSV" class="export-btn csv-btn">
        <ArrowDownIcon class="button-icon"/>
        <span>Export CSV</span>
      </button>
    </div>

    <div v-if="showPreview" class="preview-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">
            <DocumentTextIcon class="modal-icon"/>
            PDF Preview (A4 Format)
          </h3>
          <button @click="showPreview = false" class="close-btn">
            <XMarkIcon class="close-icon"/>
          </button>
        </div>
        <iframe :src="pdfPreviewUrl" class="pdf-iframe"></iframe>
        <div class="modal-footer">
          <button @click="printPDF" class="export-btn print-btn">
            <PrinterIcon class="button-icon"/>
            <span>Print</span>
          </button>
          <button @click="exportToPDF" class="export-btn pdf-btn">
            <DocumentArrowDownIcon class="button-icon"/>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  EyeIcon,
  PrinterIcon,
  DocumentTextIcon,
  XMarkIcon,ArrowDownIcon,ArrowDownTrayIcon,DocumentArrowDownIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Report'
  },
  fileName: {
    type: String,
    default: 'report'
  },
  schoolDetails: {
    type: Object,
    default: () => ({
      name: 'SCHOOL NAME',
      address: 'P.O. BOX 000-00000, CITY',
      phone: '07XXXXXXXX',
      email: 'school@example.com'
    })
  },
  classDetails: {
    type: Object,
    default: () => ({
      name: '',
      year: '',
      teacher: ''
    })
  },
  logoUrl: {
    type: String,
    default: ''
  },
  headers: {
    type: Object,
    default: () => ({})
  },
  footerData: {
    type: Array,
    default: () => []
  }
});

const showPreview = ref(false);
const pdfPreviewUrl = ref('');

const generatePDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Logo (left side)
  if (props.logoUrl) {
    doc.addImage(props.logoUrl, 'JPEG', 15, 10, 20, 20);
  }

  // School Details (centered)
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');

  // Calculate center position for school name
  const schoolName = props.schoolDetails.name;
  const schoolNameWidth = doc.getStringUnitWidth(schoolName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const centerX = (doc.internal.pageSize.width - schoolNameWidth) / 2;
  doc.text(schoolName, centerX, 15);

  // School address and contact (centered)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const address = props.schoolDetails.address;
  const addressWidth = doc.getStringUnitWidth(address) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const centerAddressX = (doc.internal.pageSize.width - addressWidth) / 2;
  doc.text(address, centerAddressX, 22);

  const contact = `${props.schoolDetails.phone} | ${props.schoolDetails.email}`;
  const contactWidth = doc.getStringUnitWidth(contact) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const centerContactX = (doc.internal.pageSize.width - contactWidth) / 2;
  doc.text(contact, centerContactX, 26);

  // Report title (centered)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const titleWidth = doc.getStringUnitWidth(props.title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const centerTitleX = (doc.internal.pageSize.width - titleWidth) / 2;
  doc.text(props.title, centerTitleX, 35);

  // Prepare table data
  const headers = ['#', ...props.columns.map(col => props.headers[col] || col.toUpperCase())];

  const body = props.data.map((item, index) => {
    return [
      index + 1,
      ...props.columns.map(col => {
        if (col.includes('.')) {
          return col.split('.').reduce((o, i) => o?.[i], item) || '';
        }
        return item[col] || '';
      })
    ];
  });

  if (props.footerData.length > 0) {
    props.footerData.forEach(footerRow => {
      body.push([
        footerRow.id || '',
        footerRow.admNo || '',
        footerRow.name || '',
        footerRow.form || '',
        footerRow.stream || '',
        footerRow.budget || '',
        footerRow.paid || '',
        footerRow.balance || '',
        footerRow.balbf || ''
      ]);
    });
  }

  // Generate the table
  autoTable(doc, {
    head: [headers],
    body: body,
    startY: 40,
    margin: { top: 10, left: 10, right: 10 },
    styles: {
      fontSize: 8,
      cellPadding: 2,
      valign: 'middle',
      halign: 'center',
      textColor: [40, 40, 40],
      lineColor: [0, 0, 0],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [51, 102, 153],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 8,
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    },
    columnStyles: {
      0: { cellWidth: 10 }
    },
    tableWidth: 'auto',
    showHead: 'everyPage',
    pageBreak: 'auto',
    rowPageBreak: 'avoid'
  });

  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 15,
        doc.internal.pageSize.height - 10
    );
  }

  return doc;
};

const previewPDF = () => {
  const doc = generatePDF();
  pdfPreviewUrl.value = doc.output('bloburl');
  showPreview.value = true;
};

const printPDF = () => {
  const doc = generatePDF();
  const pdfUrl = doc.output('bloburl');
  const printWindow = window.open(pdfUrl);
  printWindow.onload = function () {
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
};

const exportToPDF = () => {
  const doc = generatePDF();
  doc.save(`${props.fileName}.pdf`);
};
const exportToCSV = () => {
  const csvData = props.data.map((item, index) => {
    const row = { '#': index + 1 };
    props.columns.forEach(col => {
      if (col.includes('.')) {
        row[props.headers[col] || col] = col.split('.').reduce((o, i) => o?.[i], item) || '';
      } else {
        row[props.headers[col] || col] = item[col] || '';
      }
    });
    return row;
  });

  // Add footer data to CSV
  if (props.footerData.length > 0) {
    props.footerData.forEach(footerRow => {
      const footerDataRow = { '#': '' };
      props.columns.forEach(col => {
        footerDataRow[props.headers[col] || col] = footerRow[col] || '';
      });
      csvData.push(footerDataRow);
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(csvData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, `${props.fileName}.csv`, { bookType: 'csv' });
};
</script>

<style scoped>

</style>