<template>
  <div class="export-container">
    <table ref="dataTable" class="data-table">
      <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Position</th>
        <th>Salary</th>
        <th>Hire Date</th>
        <th>Status</th>
        <th>Location</th>
        <th>Projects</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.department }}</td>
        <td>{{ item.position }}</td>
        <td>${{ item.salary.toLocaleString() }}</td>
        <td>{{ item.hireDate }}</td>
        <td :class="`status-${item.status.toLowerCase().replace(' ', '-')}`">
          {{ item.status }}
        </td>
        <td>{{ item.location }}</td>
        <td>{{ item.projects }}</td>
      </tr>
      </tbody>
    </table>

    <div class="export-buttons">
      <button @click="previewPDF" class="export-btn preview-btn">
        Preview PDF
      </button>
      <button @click="exportToPDF" class="export-btn pdf-btn">
        Export to PDF
      </button>
      <button @click="exportToCSV" class="export-btn csv-btn">
        Export to CSV
      </button>
    </div>

    <!-- PDF Preview Modal -->
    <div v-if="showPreview" class="preview-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>PDF Preview (A4 Format)</h3>
          <button @click="showPreview = false" class="close-btn">&times;</button>
        </div>
        <iframe :src="pdfPreviewUrl" class="pdf-iframe"></iframe>
        <div class="modal-footer">
          <button @click="printPDF" class="export-btn print-btn">
            Print
          </button>
          <button @click="exportToPDF" class="export-btn pdf-btn">
            Download
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

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'IT', 'Product', 'Design', 'Operations'];
const positions = {
  Engineering: ['Junior Developer', 'Developer', 'Senior Developer', 'Tech Lead', 'Architect'],
  Marketing: ['Assistant', 'Specialist', 'Manager', 'Director'],
  Sales: ['Representative', 'Executive', 'Manager', 'Director'],
  HR: ['Assistant', 'Specialist', 'Manager'],
  Finance: ['Analyst', 'Senior Analyst', 'Manager'],
  IT: ['Support', 'Administrator', 'Engineer', 'Manager'],
  Product: ['Owner', 'Manager', 'Director'],
  Design: ['Designer', 'Senior Designer', 'Lead Designer'],
  Operations: ['Coordinator', 'Specialist', 'Manager']
};
const locations = ['New York', 'Chicago', 'Los Angeles', 'Boston', 'Seattle', 'Austin', 'Denver', 'Atlanta', 'San Francisco', 'Portland', 'Miami'];

function generateEmployeeData() {
  const data = [];
  for (let i = 1; i <= 100; i++) {
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const positionOptions = positions[dept];
    const position = positionOptions[Math.floor(Math.random() * positionOptions.length)];

    data.push({
      id: i,
      firstName: ['John', 'Jane', 'Robert', 'Emily', 'Michael', 'Sarah', 'David', 'Jessica', 'Thomas', 'Lisa', 'Daniel', 'Jennifer'][Math.floor(Math.random() * 12)],
      lastName: ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Miller', 'Wilson', 'Taylor', 'Anderson', 'Martinez', 'Garcia', 'Davis'][Math.floor(Math.random() * 12)],
      email: `employee${i}@example.com`,
      department: dept,
      position: position,
      salary: 50000 + Math.floor(Math.random() * 70000),
      hireDate: new Date(2015 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      status: ['Active', 'On Leave', 'Terminated'][Math.floor(Math.random() * 3)],
      location: locations[Math.floor(Math.random() * locations.length)],
      projects: Math.floor(Math.random() * 10) + 1
    });
  }
  return data;
}

const tableData = ref(generateEmployeeData());
const showPreview = ref(false);
const pdfPreviewUrl = ref('');

// Generate PDF with all columns
const generatePDF = () => {
  const doc = new jsPDF({
    orientation: 'landscape', // Landscape for better fit
    unit: 'mm',
    format: 'a4'
  });

  // Title with date
  doc.setFontSize(14);
  doc.text('Employee Data Export', 15, 15);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 20);

  // Prepare headers and data
  const headers = [
    '#',
    'First Name',
    'Last Name',
    'Email',
    'Department',
    'Position',
    'Salary',
    'Hire Date',
    'Status',
    'Location',
    'Projects'
  ];

  const body = tableData.value.map(item => [
    item.id,
    item.firstName,
    item.lastName,
    item.email,
    item.department,
    item.position,
    '$' + item.salary.toLocaleString(),
    item.hireDate,
    item.status,
    item.location,
    item.projects
  ]);

  // Column widths (total should be ~277mm for landscape A4)
  const columnStyles = {
    0: { cellWidth: 8 },   // #
    1: { cellWidth: 15 },  // First Name
    2: { cellWidth: 15 },  // Last Name
    3: { cellWidth: 30 },  // Email
    4: { cellWidth: 20 },  // Department
    5: { cellWidth: 20 },  // Position
    6: { cellWidth: 15 },  // Salary
    7: { cellWidth: 15 },  // Hire Date
    8: { cellWidth: 15 },  // Status
    9: { cellWidth: 15 },  // Location
    10: { cellWidth: 8 }  // Projects
  };

  // Add table
  autoTable(doc, {
    head: [headers],
    body: body,
    startY: 25,
    margin: {
      top: 15,
      left: 10,
      right: 10
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
      valign: 'middle',
      halign: 'left',
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [51, 102, 153],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9
    },
    columnStyles: columnStyles,
    tableWidth: 'auto',
    showHead: 'everyPage',
    pageBreak: 'auto',
    rowPageBreak: 'avoid'
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 15,
        doc.internal.pageSize.height - 10,
        null,
        null,
        'right'
    );
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
  printWindow.onload = function() {
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

// Export to CSV with all columns
const exportToCSV = () => {
  const csvData = tableData.value.map(item => ({
    '#': item.id,
    'First Name': item.firstName,
    'Last Name': item.lastName,
    'Email': item.email,
    'Department': item.department,
    'Position': item.position,
    'Salary': '$' + item.salary.toLocaleString(),
    'Hire Date': item.hireDate,
    'Status': item.status,
    'Location': item.location,
    'Projects': item.projects
  }));

  const worksheet = XLSX.utils.json_to_sheet(csvData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Data");
  XLSX.writeFile(workbook, "employee_data_export.csv", { bookType: 'csv' });
};
</script>

<style scoped>
.export-container {
  @apply max-w-full mx-auto p-6 bg-white rounded-lg shadow overflow-x-auto;
}

.data-table {
  @apply min-w-full divide-y divide-gray-200 mb-6 text-sm;
}

.data-table th {
  @apply px-4 py-2 bg-gray-100 text-left font-medium text-gray-700 uppercase tracking-wider;
}

.data-table td {
  @apply px-4 py-2 whitespace-nowrap;
}

.data-table tr:nth-child(even) {
  @apply bg-gray-50;
}

.status-active {
  @apply text-green-600 font-bold;
}
.status-on-leave {
  @apply text-yellow-600 font-bold;
}
.status-terminated {
  @apply text-red-600 font-bold;
}

.export-buttons {
  @apply flex flex-wrap gap-3 mt-6;
}

.export-btn {
  @apply px-4 py-2 rounded-md text-white font-medium transition-colors text-sm;
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

.modal-footer {
  @apply flex justify-end gap-3 p-4 border-t;
}

.close-btn {
  @apply text-2xl font-bold text-gray-500 hover:text-gray-700;
}

.pdf-iframe {
  @apply flex-grow border-0;
}
</style>