function downloadCSV(csv, filename) {
    const csvFile = new Blob([csv], { type: "text/csv" })
    const downloadLink = document.createElement("a")
    downloadLink.download = filename
    downloadLink.href = window.URL.createObjectURL(csvFile)
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
}

export default function exportTableToCSV(htmlTable, filename) {
    let csv = []
    let rows = htmlTable.querySelectorAll("tr");
    for (let i = 0; i < rows.length; i++) {
        let row = []
        let cols = rows[i].querySelectorAll("td, th")          
        for (let j = 0; j < cols.length; j++) {
            let data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ")
            data = data.replace(/"/g, '""')
            row.push('"' + data + '"')
        }
        csv.push(row.join(","))
    }
    downloadCSV(csv.join("\n"), filename)
}