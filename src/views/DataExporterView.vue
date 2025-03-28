<template>
  <div class="export-container">
    <div class=" export-buttons-top">
      <button @click="previewPDF" class="export-btn preview-btn">
        <EyeIcon class="button-icon"/>
        <span>Preview PDF</span>
      </button>
      <button @click="exportToPDF" class="export-btn pdf-btn">
        <PrinterIcon class="button-icon"/>
        <span>Download PDF</span>
      </button>
      <button @click="exportToCSV" class="export-btn csv-btn">
        <PrinterIcon class="button-icon"/>
        <span>Export CSV</span>
      </button>
      <button @click="printPDF" class="export-btn print-btn">
        <PrinterIcon class="button-icon"/>
        <span>Print</span>
      </button>
    </div>
    <div class="flex md:hidden gap-6">
      <button @click="printPDF" class="export-btn print-btn">
        <PrinterIcon class="button-icon"/>
        <span>Print</span>
      </button>
      <button @click="exportToCSV" class="export-btn csv-btn">
        <PrinterIcon class="button-icon"/>
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
            <PrinterIcon class="button-icon"/>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  EyeIcon,
  EyeSlashIcon,
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
    default: 'Class List'
  },
  fileName: {
    type: String,
    default: 'class_list'
  },
  schoolDetails: {
    type: Object,
    default: () => ({
      name: 'SAMIS SAMPLE SECONDARY SCHOOL-NAKURU',
      address: 'P.O. BOX 237-30705, NAKURU',
      phone: '071111',
      email: 'k@gmail.com'
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


  if (props.logoUrl) {

    doc.addImage(props.logoUrl, 'JPEG', 150, 10, 20, 20);
  }

  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.text(props.schoolDetails.name, 20, 15);


  doc.setFontSize(14);
  doc.text(props.title, 105, 22, {align: 'center'});


  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(props.schoolDetails.address, 20, 28);
  doc.text(`${props.schoolDetails.phone} | ${props.schoolDetails.email}`, 20, 32);

  if (props.classDetails.name) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${props.classDetails.name} - ${props.classDetails.year} - Class list`, 105, 40, {align: 'center'});
    doc.setFont('sans-serif', 'normal');
    doc.text(`Teacher: ${props.classDetails.teacher}`, 105, 46, {align: 'center'});
  }

  const body = props.data.map((item, index) => {
    return [
      index + 1, // Add # column
      ...props.columns.map(col => {
        if (col.includes('.')) {
          return col.split('.').reduce((o, i) => o[i], item);
        }
        return item[col];
      })
    ];
  });

  const headers = ['#', ...props.columns.map(col => col.toUpperCase())];

  autoTable(doc, {
    head: [headers],
    body: body,
    startY: props.classDetails.name ? 50 : 40,
    margin: {top: 10, left: 10, right: 10},
    styles: {
      fontSize: 10,
      cellPadding: 3,
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
      fontSize: 10,
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    },
    columnStyles: {
      0: {cellWidth: 10}
    },
    tableWidth: 'auto',
    showHead: 'everyPage',
    pageBreak: 'auto',
    rowPageBreak: 'avoid'
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFillColor(240, 240, 240);
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
    const row = {'#': index + 1};
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Class List");
  XLSX.writeFile(workbook, `${props.fileName}.csv`, {bookType: 'csv'});
};
</script>

<style scoped>
.export-container {
  @apply max-w-full mx-auto p-4 bg-white;
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