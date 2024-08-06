window.html2canvas = html2canvas;
window.jsPDF = window.jspdf.jsPDF;

function digitZero(angka) {
    // Konversi angka menjadi string
    var angkaString = String(angka);

    // Menghitung jumlah digit
    var jumlahDigit = angkaString.length;

    // Tambahkan angka 0 di belakang jika jumlah digit kurang dari 4
    if (jumlahDigit < 4) {
        angkaString = "0".repeat(4 - jumlahDigit) + angkaString;
    }

    // Mengembalikan hasil
    return angkaString;
}
function uploadLocal(dataAsset) {
    let asset = [];
    const saveAsset = (asset) => {
        localStorage.setItem("asset", JSON.stringify(asset));
    };
    const getAsset = () => {
        const assetJSON = localStorage.getItem("asset");
        return assetJSON ? JSON.parse(assetJSON) : [];
    };
    asset = getAsset();

    asset.push(dataAsset);
    saveAsset(asset);
}

document.getElementById("save_btn").addEventListener('click', function (event) {


    const unitCode = document.getElementById("unit_code").value;
    const deviceType = document.getElementById("device_type").value;
    const firstNum = parseInt(document.getElementById("first_num").value);
    const lastNum = parseInt(document.getElementById("last_num").value);
    event.preventDefault(); // Menghentikan navigasi default

    // location.reload();
    let i = 0
    for (i = firstNum; i <= lastNum; i++) {
        let dataAsset = `Z2-Q-${unitCode}-${deviceType}-${digitZero(i)}`
        uploadLocal(dataAsset)

    }

    alert("Asset berhasil disimpan!")

});

document.getElementById("show_asset").addEventListener('click', function (event) {
    let data = null;
    let dataLocal = JSON.parse(localStorage.getItem('asset'));
    if (dataLocal) {
        data = dataLocal
    } else {
        let dataRandomAsset = document.getElementById("random_asset").value;
        data = dataRandomAsset.split('\n')
    }


    let table = document.getElementById("myTable");
    let rowIndex = 1;
    let colIndex = 0;

    data.forEach(function (element) {
        let row = table.rows[rowIndex];

        if (!row) {
            row = table.insertRow(rowIndex);
        }

        let cell = row.insertCell(colIndex);
        let qrcode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${element}`

        cell.innerHTML = `              <div class="bg-white flex flex-row justify-between">
        <div class="py-4 px-5 flex justify-center">
          <img src="${qrcode}" alt="" srcset="" width="80px" crossOrigin="anonymous"  />
        </div>
        <div class="py-2 px-5 text-center">
          <img crossOrigin="anonymous" src="https://i.postimg.cc/sD7SJCdW/bit-logo.png" alt="" width="120px" class="ml-2" />
          <p class="text-xs">081222006261</p>
          <p class="text-xs">bribox.zona2@corp.bri.co.id</p>
          <p class="text-xs">2024</p>
          <p class="text-xs">${element}</p>
        </div>
      </div>`;

        colIndex++;

        if (colIndex === 4) {
            rowIndex++;
            colIndex = 0;
        }
    });
})

document.getElementById("delete_all_asset").addEventListener('click', function (event) {
    let dataLocal = JSON.parse(localStorage.getItem('asset'));
    if (dataLocal) {
        localStorage.removeItem('asset');
        location.reload();
    } else {
        location.reload();

    }


})


document.getElementById("download").addEventListener('click', function (event) {
    const unitName = document.getElementById("unit_name").value;


    html2canvas(document.querySelector("#myTable"), {
        allowTaint: false,
        useCORS: true,
        scale: 1,
    }).then((canvas) => {
        document.body.appendChild(canvas);
        let doc = new jsPDF();
        let img = canvas.toDataURL("image/png");
        let width = canvas.width / 5.9;
        let height = canvas.height / 5.7;


        doc.addImage(img, "PNG", 0, 0, width, height);
        doc.save(`Sticker ${unitName}`);
    });

})

