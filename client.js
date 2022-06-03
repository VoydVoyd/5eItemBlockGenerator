import "./html2canvas-min.js"

var imageScale = 10;

var item = document.getElementById("item");

var title = document.getElementById("title");
var subtitle = document.getElementById("subtitle");
var description = document.getElementById("description");

var titleInput = document.getElementById("titleInput");
var descriptionInput = document.getElementById("descriptionInput");

var saveImageOutputButton = document.getElementById("saveImageOutputButton");
var generateImageModalButton = document.getElementById("generateImageModalButton");

var overrideSubtitleCheck = document.getElementById("overrideSubtitleCheck");
var subtitleInputRow = document.getElementById("subtitleInputRow");
var subtitleInput = document.getElementById("subtitleInput");

var subtitleSettings = document.getElementById("subtitleSettings");

var baseItemTypeDropdown = document.getElementById("baseItemTypeDropdown");
var itemTypeDropdown = document.getElementById("itemTypeDropdown");
var weaponTypeDropdown = document.getElementById("weaponTypeDropdown");
var armorTypeDropdown = document.getElementById("armorTypeDropdown");

var customItemTypeInputRow = document.getElementById("customItemTypeInputRow");
var customItemTypeInput = document.getElementById("customItemTypeInput");
var customItemTypeInputLabel = document.getElementById("customItemTypeInputLabel");

var rarityDropdown = document.getElementById("rarityDropdown");
var customRarityInputRow = document.getElementById("customRarityInputRow");
var customRarityInput = document.getElementById("customRarityInput");

var attunementCheck = document.getElementById("attunementCheck");
var attunementDetailsInputRow = document.getElementById("attunementDetailsInputRow");
var attunementDetailsInput = document.getElementById("attunementDetailsInput");

var widthSlider = document.getElementById("widthSlider");

var imageOutput = document.getElementById("imageOutput");

var image;

updateSubtitle();

titleInput.addEventListener('keyup', function(e) {
    title.innerHTML = sanitize(titleInput.value);
});

descriptionInput.addEventListener('keyup', function(e) {
    description.innerHTML = sanitize(descriptionInput.value);
});

generateImageModalButton.addEventListener("click", function(e) {
    html2canvas(item, {         
        scale: imageScale
    }).then(function(canvas) {
        image = canvas.toDataURL("image/png");
        imageOutput.src = image;
    });
});

saveImageOutputButton.addEventListener("click", function(e) {
    html2canvas(item, {         
        scale: imageScale
    }).then(function(canvas) {
       const link = document.createElement('a');
       link.download = "download.png";
       link.href = canvas.toDataURL("image/png");
       link.click();
       link.delete;
    });
});

overrideSubtitleCheck.addEventListener("change", function(e) {
    subtitleInputRow.hidden = !overrideSubtitleCheck.checked;
    subtitleSettings.hidden = overrideSubtitleCheck.checked;
    updateSubtitle();
});

subtitleInput.addEventListener('keyup', function(e) {
    updateSubtitle();
});

baseItemTypeDropdown.addEventListener("change", function(e) {
    itemTypeDropdown.hidden = true;
    weaponTypeDropdown.hidden = true;
    armorTypeDropdown.hidden = true;
    customItemTypeInputRow.hidden = true;

    switch(baseItemTypeDropdown.value) {
        case "Item":
            itemTypeDropdown.hidden = false;
            break;
        case "Weapon":
            weaponTypeDropdown.hidden = false;
            break;
        case "Armor":
            armorTypeDropdown.hidden = false;
            break;
        case "Custom":
            customItemTypeInputRow.hidden = false;
            customItemTypeInputLabel.innerHTML = "Custom Item Type:";
            break;
    }
    updateSubtitle();
});

itemTypeDropdown.addEventListener("change", function(e) {
    updateSubtitle();
});

weaponTypeDropdown.addEventListener("change", function(e) {
    if (weaponTypeDropdown.value == "Custom") {
        customItemTypeInputRow.hidden = false;
        customItemTypeInputLabel.innerHTML = "Custom Weapon Type:";
    }
    else {
        customItemTypeInputRow.hidden = true;
    }
    updateSubtitle();
});

armorTypeDropdown.addEventListener("change", function(e) {
    if (armorTypeDropdown.value == "Custom") {
        customItemTypeInputRow.hidden = false;
        customItemTypeInputLabel.innerHTML = "Custom Armor Type:";
    }
    else {
        customItemTypeInputRow.hidden = true;
    }
    updateSubtitle();
});

customItemTypeInput.addEventListener("keyup", function(e) {
    updateSubtitle();
});

rarityDropdown.addEventListener("change", function(e) {
    if (rarityDropdown.value == "Custom") {
        customRarityInputRow.hidden = false;
    }
    else {
        customRarityInputRow.hidden = true;
    }
    updateSubtitle();
});

customRarityInput.addEventListener("keyup", function(e) {
    updateSubtitle();
});

attunementCheck.addEventListener("change", function(e) {
    attunementDetailsInputRow.hidden = !attunementCheck.checked;
    updateSubtitle();
});

attunementDetailsInput.addEventListener("keyup", function(e) {
    updateSubtitle();
});

widthSlider.addEventListener("input", function(e) {
    item.style.width = widthSlider.value + "px";
});

function updateSubtitle() {
    var str = "";

    if (overrideSubtitleCheck.checked) {
        str = subtitleInput.value;
    }
    else {
        switch(baseItemTypeDropdown.value) {
            case "Item":
                str += itemTypeDropdown.value + ", ";
                break;
            case "Weapon":
                str += "Weapon (";
                if (weaponTypeDropdown.value == "Custom") {
                    str += customItemTypeInput.value.toLowerCase();                
                }
                else {
                    str += weaponTypeDropdown.value.toLowerCase();
                }
                str += "), ";
                break;
            case "Armor":
                str += "Armor (" + armorTypeDropdown.value + "), ";
                if (armorTypeDropdown.value == "Custom") {
                    str += customItemTypeInput.value.toLowerCase();                
                }
                else {
                    str += armorTypeDropdown.value.toLowerCase();
                }
                str += "), ";
                break;
            case "Custom":
                str += customItemTypeInput.value + ", ";
                break;
        }
    
        if (rarityDropdown.value == "Custom") {
            str += customRarityInput.value.toLowerCase();
        }
        else {
            str += rarityDropdown.value.toLowerCase();
        }
    
        if (attunementCheck.checked) {
            str += " (requires attunement";
            if (attunementDetailsInput.value.trim() != "") {
                str += " " + attunementDetailsInput.value.trim();
            }
            str += ")";
        }
    }
    
    subtitle.innerHTML = str;
}

function sanitize(str) {
    return str.replace("<", "&lt;");
}