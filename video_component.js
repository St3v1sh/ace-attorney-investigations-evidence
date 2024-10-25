// Scale if mobile.
const urlParams = new URLSearchParams(window.location.search).get("platform");
if (urlParams === "mobile") {
    document.documentElement.style.fontSize = "40%";
}

// Fetch data.
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response error`);
    }
    const data = await response.json();
    return data.values.slice(1).filter((d) => !d.every((v) => v === ""));
}

// Update evidence list.
function update() {
    const content = document.getElementById("content");
    content.innerHTML = `<span class="loading">LOADING</span>`;

    const url = "https://script.google.com/macros/s/AKfycbx7tUkCXq_Qx1vB89OKpXUuMntd2JTDGDM5nyyOIhUV1T_JKEd5XGUNuTNvDWTeSurQhQ/exec?spreadsheetId=1cFQ63OScDlJGAISzanY2W9goLaFwtEAcP890CBh2A94&sheetName=Sheet1";
    const descriptions = [];

    fetchData(url).then((data) => {
        content.innerHTML = "";
        data.forEach((d, i) => {
            const button = document.createElement("button");
            button.innerHTML = `
            <img src="${d[2]}" alt="">
            <span class="title">${d[0]}</span>
            `;
            content.appendChild(button);
            descriptions.push(d[1]);

            button.onclick = () => {
                const modal = document.getElementById("modal");
                if (!modal.classList.contains("show-modal")) {
                    // Set up the modal.
                    const images = d[3] === "" ? [d[2]] : d[3].split(",").map((s) => s.trim());
                    let renderedModal = `<div>`;

                    images.forEach((img) => {
                        renderedModal += `<img src="${img}" alt="">`;
                    });
                    renderedModal += "</div>";
                    renderedModal += `<span class="description">${descriptions[i]}</span>`;
                    renderedModal += `<button>OK</button>`;
                    modal.innerHTML = renderedModal;

                    modal.classList.add("show-modal");
                    modal.classList.add("slide-in");
                }
            };
        });
    }).catch((err) => {
        content.innerHTML = `<span>Error loading: ${err.message}</span>`;
    });
}

document.getElementById("update").onclick = () => {
    update();
};

document.getElementById("modal").onclick = () => {
    document.getElementById("modal").classList.remove("show-modal");
};

// Initial update.
update();
