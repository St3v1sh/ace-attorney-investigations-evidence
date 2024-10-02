async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response error`);
    }
    const data = await response.json();
    return data.values.slice(1).filter((d) => !d.every((v) => v === ""));
}

function update() {
    const content = document.getElementById("content");
    content.innerHTML = `<span style="margin-top: 5rem;">LOADING</span>`;

    const url = "https://script.google.com/macros/s/AKfycbx7tUkCXq_Qx1vB89OKpXUuMntd2JTDGDM5nyyOIhUV1T_JKEd5XGUNuTNvDWTeSurQhQ/exec?spreadsheetId=1cFQ63OScDlJGAISzanY2W9goLaFwtEAcP890CBh2A94&sheetName=Sheet1";
    const descriptions = [];

    fetchData(url).then((data) => {
        content.innerHTML = "";
        data.forEach((d, i) => {
            const button = document.createElement("button");
            button.innerHTML = `
            <img src="${d[0]}" alt="">
            <span class="title">${d[1]}</span>
            `;
            content.appendChild(button);
            descriptions.push(d[2]);

            button.onclick = () => {
                const modal = document.getElementById("modal");
                const modalImg = modal.querySelector("img");
                const modalDescription = modal.querySelector("span");
                if (!modal.classList.contains("show-modal")) {
                    modal.classList.add("show-modal");
                    modal.classList.add("slide-in");
                    modalImg.src = d[0];
                    modalDescription.textContent = descriptions[i];
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

update();
