<template>
  <div class="export-container">
    <div class="export-buttons-top">
      <button @click="previewPDF" class="export-btn preview-btn">
        <EyeIcon class="button-icon" />
        <span>Preview PDF</span>
      </button>
      <button @click="exportToPDF" class="export-btn pdf-btn">
        <PrinterIcon class="button-icon" />
        <span>Download PDF</span>
      </button>
      <button @click="exportToCSV" class="export-btn csv-btn">
        <PrinterIcon class="button-icon" />
        <span>Export CSV</span>
      </button>
      <button @click="printPDF" class="export-btn print-btn">
        <PrinterIcon class="button-icon" />
        <span>Print</span>
      </button>
    </div>

    <div v-if="showPreview" class="preview-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">
            <DocumentTextIcon class="modal-icon" />
            PDF Preview (A4 Format)
          </h3>
          <button @click="showPreview = false" class="close-btn">
            <XMarkIcon class="close-icon" />
          </button>
        </div>
        <iframe :src="pdfPreviewUrl" class="pdf-iframe"></iframe>
        <div class="modal-footer">
          <button @click="printPDF" class="export-btn print-btn">
            <PrinterIcon class="button-icon" />
            <span>Print</span>
          </button>
          <button @click="exportToPDF" class="export-btn pdf-btn">
            <PrinterIcon class="button-icon" />
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
  XMarkIcon
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
    default: 'Data Export'
  },
  fileName: {
    type: String,
    default: 'data_export'
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

  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text(props.title, 105, 15, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });

  const body = props.data.map(item => {
    return props.columns.map(col => {
      if (col.includes('.')) {
        return col.split('.').reduce((o, i) => o[i], item);
      }
      return item[col];
    });
  });

  const columnStyles = {};
  props.columns.forEach((_, index) => {
    columnStyles[index] = { cellWidth: 'auto' };
  });

  autoTable(doc, {
    head: [props.columns],
    body: body,
    startY: 30,
    margin: { top: 25, left: 10, right: 10 },
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'middle',
      halign: 'left',
      textColor: [40, 40, 40]
    },
    headStyles: {
      fillColor: [51, 102, 153],
      textColor: 255,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 10
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    },
    columnStyles: columnStyles,
    tableWidth: 'auto',
    showHead: 'everyPage',
    pageBreak: 'auto',
    rowPageBreak: 'avoid'
  });

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
  printWindow.onload = function() {
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
  const csvData = props.data.map(item => {
    const row = {};
    props.columns.forEach(col => {
      if (col.includes('.')) {
        row[col] = col.split('.').reduce((o, i) => o[i], item);
      } else {
        row[col] = item[col];
      }
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(csvData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data");
  XLSX.writeFile(workbook, `${props.fileName}.csv`, { bookType: 'csv' });
};
</script>

<style scoped>
.export-container {
  @apply max-w-full mx-auto p-4 bg-white rounded-lg shadow;
}

.export-buttons-top {
  @apply flex flex-wrap gap-3 mb-4 justify-end;
}

.table-wrapper {
  @apply overflow-x-auto border rounded-lg;
}

.data-table {
  @apply min-w-full divide-y divide-gray-200 text-sm;
}

.data-table th {
  @apply px-3 py-2 bg-gray-100 text-left font-medium text-gray-700 uppercase tracking-wider;
}

.data-table td {
  @apply px-3 py-1 whitespace-nowrap;
}

.status-active {
  @apply text-green-600 font-medium;
}

.status-on-leave {
  @apply text-yellow-600 font-medium;
}

.status-terminated {
  @apply text-red-600 font-medium;
}

.export-btn {
  @apply inline-flex items-center gap-2 px-3 py-2 rounded-md text-white font-medium transition-colors text-sm;
}

.preview-btn {
  @apply bg-blue-600 hover:bg-blue-700;
}

.pdf-btn {
  @apply bg-red-600 hover:bg-red-700;
}

.csv-btn {
  @apply bg-green-600 hover:bg-green-700;
}

.print-btn {
  @apply bg-purple-600 hover:bg-purple-700;
}

.button-icon {
  @apply h-4 w-4;
}

.preview-modal {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.modal-content {
  @apply bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col;
}

.modal-header {
  @apply flex justify-between items-center p-4 border-b;
}

.modal-title {
  @apply flex items-center gap-2 text-lg font-semibold;
}

.modal-icon {
  @apply h-5 w-5 text-blue-600;
}

.modal-footer {
  @apply flex justify-end gap-3 p-4 border-t;
}

.close-btn {
  @apply p-1 rounded-md hover:bg-gray-100;
}

.close-icon {
  @apply h-5 w-5 text-gray-500;
}

.pdf-iframe {
  @apply flex-grow border-0;
}
</style>