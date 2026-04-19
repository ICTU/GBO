function downloadPDF() {
    // Open de print-site pagina in een nieuw tabblad
    var printWindow = window.open('../print_page/', '_blank');

    // Zodra het tabblad geladen is, start de print-dialoog
    printWindow.onload = function() {
        printWindow.print();
    };
}
