<template>
  <div class="export-container">
    <!-- Export buttons at the top -->
    <div class="export-buttons-top">
      <button @click="previewPDF" class="export-btn preview-btn">
        <EyeIcon class="button-icon"/>
        <span>Preview PDF</span>
      </button>
      <button @click="exportToPDF" class="export-btn pdf-btn">
        <printer-icon class="button-icon"/>
        <span>Download PDF</span>
      </button>
      <button @click="exportToCSV" class="export-btn csv-btn">
        <printer-icon class="button-icon"/>
        <span>Export CSV</span>
      </button>
      <button @click="printPDF" class="export-btn print-btn">
        <PrinterIcon class="button-icon"/>
        <span>Print</span>
      </button>
    </div>

    <!-- Data table -->
    <div class="table-wrapper">
      <table ref="dataTable" class="data-table">
        <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Department</th>
          <th>Position</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in tableData" :key="index" :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
          <td class="py-1">{{ item.id }}</td>
          <td class="py-1">{{ item.firstName }}</td>
          <td class="py-1">{{ item.lastName }}</td>
          <td class="py-1">{{ item.department }}</td>
          <td class="py-1">{{ item.position }}</td>
          <td class="py-1" :class="`status-${item.status.toLowerCase().replace(' ', '-')}`">
            {{ item.status }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- PDF Preview Modal -->
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
            <printer-icon class="button-icon"/>
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
  PrinterIcon,
  DocumentTextIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

// Fixed sample dataset (5 realistic records)
const tableData = ref([
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'Active',
    email: 'john.doe@company.com',
    salary: 85000,
    hireDate: '2018-06-15'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    department: 'Marketing',
    position: 'Marketing Manager',
    status: 'Active',
    email: 'jane.smith@company.com',
    salary: 78000,
    hireDate: '2019-03-22'
  },
  {
    id: 3,
    firstName: 'Robert',
    lastName: 'Johnson',
    department: 'Sales',
    position: 'Sales Executive',
    status: 'On Leave',
    email: 'robert.j@company.com',
    salary: 65000,
    hireDate: '2020-11-05'
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Williams',
    department: 'HR',
    position: 'HR Specialist',
    status: 'Active',
    email: 'emily.w@company.com',
    salary: 72000,
    hireDate: '2017-09-18'
  },
  {
    id: 5,
    firstName: 'Michael',
    lastName: 'Brown',
    department: 'Finance',
    position: 'Financial Analyst',
    status: 'Terminated',
    email: 'michael.b@company.com',
    salary: 82000,
    hireDate: '2019-07-30'
  },
  {
    "id": 6,
    "firstName": "Sophia",
    "lastName": "Clark",
    "department": "Marketing",
    "position": "Marketing Manager",
    "status": "Active",
    "email": "sophia.c@company.com",
    "salary": 92000,
    "hireDate": "2018-05-21"
  },
  {
    "id": 7,
    "firstName": "Daniel",
    "lastName": "Johnson",
    "department": "IT",
    "position": "Software Engineer",
    "status": "Active",
    "email": "daniel.j@company.com",
    "salary": 105000,
    "hireDate": "2020-02-14"
  },
  {
    "id": 8,
    "firstName": "Emily",
    "lastName": "Martinez",
    "department": "HR",
    "position": "HR Specialist",
    "status": "Active",
    "email": "emily.m@company.com",
    "salary": 68000,
    "hireDate": "2017-09-12"
  },
  {
    "id": 9,
    "firstName": "Christopher",
    "lastName": "Wilson",
    "department": "Finance",
    "position": "Accountant",
    "status": "On Leave",
    "email": "chris.w@company.com",
    "salary": 78000,
    "hireDate": "2016-11-30"
  },
  {
    "id": 10,
    "firstName": "Olivia",
    "lastName": "Davis",
    "department": "IT",
    "position": "UI/UX Designer",
    "status": "Active",
    "email": "olivia.d@company.com",
    "salary": 86000,
    "hireDate": "2021-08-22"
  },
  {
    "id": 11,
    "firstName": "Liam",
    "lastName": "Anderson",
    "department": "Operations",
    "position": "Operations Manager",
    "status": "Terminated",
    "email": "liam.a@company.com",
    "salary": 97000,
    "hireDate": "2015-06-05"
  },
  {
    "id": 12,
    "firstName": "Ava",
    "lastName": "White",
    "department": "Sales",
    "position": "Sales Representative",
    "status": "Active",
    "email": "ava.w@company.com",
    "salary": 72000,
    "hireDate": "2019-03-17"
  },
  {
    "id": 13,
    "firstName": "Benjamin",
    "lastName": "Harris",
    "department": "IT",
    "position": "System Administrator",
    "status": "Active",
    "email": "ben.h@company.com",
    "salary": 95000,
    "hireDate": "2020-10-05"
  },
  {
    "id": 14,
    "firstName": "Isabella",
    "lastName": "Garcia",
    "department": "Finance",
    "position": "Financial Advisor",
    "status": "Active",
    "email": "isabella.g@company.com",
    "salary": 88000,
    "hireDate": "2017-07-01"
  },
  {
    "id": 15,
    "firstName": "James",
    "lastName": "Moore",
    "department": "Legal",
    "position": "Legal Counsel",
    "status": "On Leave",
    "email": "james.m@company.com",
    "salary": 102000,
    "hireDate": "2016-04-20"
  },
  {
    "id": 16,
    "firstName": "Charlotte",
    "lastName": "Lopez",
    "department": "HR",
    "position": "Recruitment Manager",
    "status": "Active",
    "email": "charlotte.l@company.com",
    "salary": 73000,
    "hireDate": "2018-12-10"
  },
  {
    "id": 17,
    "firstName": "William",
    "lastName": "Gonzalez",
    "department": "IT",
    "position": "DevOps Engineer",
    "status": "Terminated",
    "email": "william.g@company.com",
    "salary": 99000,
    "hireDate": "2019-01-25"
  },
  {
    "id": 18,
    "firstName": "Mia",
    "lastName": "Perez",
    "department": "Marketing",
    "position": "Content Writer",
    "status": "Active",
    "email": "mia.p@company.com",
    "salary": 62000,
    "hireDate": "2021-06-18"
  },
  {
    "id": 19,
    "firstName": "Ethan",
    "lastName": "Thomas",
    "department": "Finance",
    "position": "Investment Analyst",
    "status": "Active",
    "email": "ethan.t@company.com",
    "salary": 89000,
    "hireDate": "2018-11-07"
  },
  {
    "id": 20,
    "firstName": "Amelia",
    "lastName": "Taylor",
    "department": "Sales",
    "position": "Sales Manager",
    "status": "On Leave",
    "email": "amelia.t@company.com",
    "salary": 95000,
    "hireDate": "2017-05-15"
  }
]);

const showPreview = ref(false);
const pdfPreviewUrl = ref('');
const generatePDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Title with date
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text('Employee Data Report', 105, 15, {align: 'center'});

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const generatedOn = `Generated on: ${new Date().toLocaleString()}`;
  doc.text(generatedOn, 105, 22, {align: 'center'});

  // Table headers and data
  const headers = ['#', 'First Name', 'Last Name', 'Email', 'Department', 'Position', 'Status'];

  const body = tableData.value.map((item, index) => [
    index + 1,
    item.firstName,
    item.lastName,
    item.email,
    item.department,
    item.position,
    item.status
  ]);


  const columnStyles = {
    0: {cellWidth: 10},
    1: {cellWidth: 30},
    2: {cellWidth: 30},
    3: {cellWidth: 40},
    4: {cellWidth: 30},
    5: {cellWidth: 30},
    6: {cellWidth: 20}
  };

  // Add table with automatic page breaks
  autoTable(doc, {
    head: [headers],
    body: body,
    startY: 30,
    margin: {top: 25, left: 10, right: 10},
    styles: {
      fontSize: 9,
      cellPadding: 2,
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
      fontSize: 9
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
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Footer background
    doc.setFillColor(220, 220, 220);
    doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');

    // Footer text
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 50);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, pageHeight - 5);
    doc.text(generatedOn, 10, pageHeight - 5);
  }

  return doc;
};


// Preview PDF
const previewPDF = () => {
  const doc = generatePDF();
  pdfPreviewUrl.value = doc.output('bloburl');
  showPreview.value = true;
};

// Print PDF
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

// Export to PDF
const exportToPDF = () => {
  const doc = generatePDF();
  doc.save('employee_data_export.pdf');
};

// Export to CSV
const exportToCSV = () => {
  const csvData = tableData.value.map(item => ({
    '#': item.id,
    'First Name': item.firstName,
    'Last Name': item.lastName,
    'Department': item.department,
    'Position': item.position,
    'Status': item.status,
    'Email': item.email,
    'Salary': '$' + item.salary.toLocaleString(),
    'Hire Date': item.hireDate
  }));

  const worksheet = XLSX.utils.json_to_sheet(csvData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Data");
  XLSX.writeFile(workbook, "employee_data_export.csv", {bookType: 'csv'});
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

/* Preview Modal */
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