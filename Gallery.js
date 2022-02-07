/**
 * Developer flag for thumbnail animation settings.
 */
const bAnimateThumbnail = false;

/**
 * Array of image objects.
 */
const aImages = [
    {
        src: "./images/dragon.jpg",
        title: "Sárkány",
        description: "Növényi eredetű sárkány és növényi eredetű álomtáncos gazdája, aki elbájolta őt."
    },
    {
        src: "./images/fantasy-barren-world.jpg",
        title: "Meddő vidék",
        description: "Pusztulófélben lévő táj, egy korokkal ezelőtt elpusztult leláncolt vasgólem maradványaival, "
            + "továbbá elcsigázott, jobb élet reményében vándorló embertömegekkel."
    },
    {
        src: "./images/fantasy-cave.jpg",
        title: "Barlang",
        description: "Ősi, mágikus épület romjai a hegyen és a varázslók csarnoka a barlangrendszerben."
    },
    {
        src: "./images/fantasy-digital-universe.jpg",
        title: "Galaxis",
        description: "Futurisztikus univerzum égi jelenésekkel, űrhajókkal, jövőbeli várossal."
    },
    {
        src: "./images/fantasy-forest-city.jpg",
        title: "Erdőváros",
        description: "Titkos tünde település az erdő mélyén, fákból és fákra építve, ahol a mágikus faj képviselői a mindennapjaikat élik."
    },
    {
        src: "./images/high-city.jpg",
        title: "Magaslati városok",
        description: "Magasan a folyó fölé épített robusztus városok és tornyok, melyek mindamellett, hogy építészeti remekművek, "
            + "még jól védettek is. Speciális léghajókkal, repülő vitorlásokkal közelíthetők meg."
    },
    {
        src: "./images/nagrand.jpg",
        title: "Lebegő szigetek",
        description: "A tűhegyes magaslatok, lebegő szigetek egy ősi, elpusztult civilizáció mementói."
    },
    {
        src: "./images/oz-the-great-and-powerful.jpg",
        title: "Oz, a nagy varázsló",
        description: "Idilli tájkép az Oz, a nagy varázsló világából."
    },
    {
        src: "./images/ships.jpg",
        title: "Flotta",
        description: "Középkori vitorlásflotta, kalózhajók garmadája."
    },
    {
        src: "./images/wolf-lady.jpg",
        title: "A farkasos hölgy",
        description: "Titokzatos női alak az idomított farkasával, pisztollyal a kezében. A város melletti magaslaton szemlélődik, "
            + "és még egyszer, utoljára végiggondolja a tervet, mielőtt behatol a településre és végrehajtja jogos bosszúját."
    }
];

/**
 * Changes displayed image based on its index.
 * @param {integer} iIndex Array index of the image. 
 */
const fChangeImage = function (iIndex) {
    $("#actual-image").attr("src", aImages[iIndex].src);
    $("#actual-image").attr("alt", aImages[iIndex].title);
    $("#image-title").text(aImages[iIndex].title);
    $("#image-description").text(aImages[iIndex].description);
};

/**
 * Emphasizes chosen thumbnail element.
 * @param {integer} iIndex Array index of the image.
 * @param {integer} iLastIndex Array index of the last active image. If equals -1, previous image does not exist.
 */
const fEmphasizeThumbnail = function (iIndex, iLastIndex) {
    const thumbnail = $("#thumbnail-container").children()[iIndex]; // .thumbnail DOM element.
    if (bAnimateThumbnail) {
        $(thumbnail).animate({
            width: "120px",
            height: "72px",
            margin: "0 0"
        }, 400, "swing", function () {
            $($(thumbnail).children()[0]).css("display", "block"); // Show small triangle shape.
        });
    } else {
        $(thumbnail).css("width", "120px");
        $(thumbnail).css("height", "72px");
        $(thumbnail).css("margin", "0 0");
        $($(thumbnail).children()[0]).css("display", "block"); // Show small triangle shape.
    }
    if (iLastIndex >= 0) {
        const thumbnail = $("#thumbnail-container").children()[iLastIndex];
        $(thumbnail).finish();
        $(thumbnail).css("width", "100px");
        $(thumbnail).css("height", "60px");
        $(thumbnail).css("margin", "12px 10px"); // Width: 20px (CSS) - (2 * 4px (border)) - 2px (shadow spread)
        $($(thumbnail).children()[0]).css("display", "none"); // Hide small triangle shape.
    }
};

/**
 * Current image index.
 */
let iImageIndex = 0;

/**
 * Loading first image.
 */
fChangeImage(iImageIndex);

/**
 * Changes image index valus +/- 1.
 * @param {integer} iDirection Direction of the image change (+1: right, -1: left).
 */
const fChangeIndex = function (iDirection) {
    const iLastIndex = iImageIndex;
    iImageIndex += iDirection + aImages.length;
    iImageIndex %= aImages.length;
    fChangeImage(iImageIndex);
    fEmphasizeThumbnail(iImageIndex, iLastIndex);
};

/**
 * Image left-right navigation event listeners.
 */
$("#nav-left").click(function () {
    fChangeIndex(-1);
});
$("#nav-right").click(function () {
    fChangeIndex(1);
});

/**
 * Making description of image transparent when hover.
 */
$("#actual-image").hover(function (oEvent) {
    if (oEvent.type == "mouseenter") {
        $("#image-information").finish();
        $("#image-information").animate({
            opacity: 0.25
        }, 700);
    } else if (oEvent.type == "mouseleave") {
        $("#image-information").finish();
        $("#image-information").animate({
            opacity: 1
        }, 700);
    }
});

/**
 * Loading thumbnails.
 */
aImages.forEach(function (oImage, iIndex) {
    $("#thumbnail-container").append(`
        <div class="thumbnail shadow" data-index="${iIndex}">
            <div class="triangle-up"></div>
            <div class="tooltip shadow">${oImage.title}</div>
            <div class="triangle-down"></div>
            <img class="thumbnail-image" src="${oImage.src}" alt="${oImage.title}" data-index="${iIndex}">
        </div>
    `);
});

/**
 * Thumbnail click event.
 */
$(".thumbnail").click(function (oEvent) {
    const iLastIndex = iImageIndex;
    iImageIndex = parseInt($(oEvent.target).attr('data-index'));
    fChangeImage(iImageIndex);
    fEmphasizeThumbnail(iImageIndex, iLastIndex);
});

/**
 * Making description of image transparent when hover.
 */
$(".thumbnail-image").hover(function (oEvent) {
    const oTooltip = $($(oEvent.target).siblings()[1]),
        oTriangle = $($(oEvent.target).siblings()[2]);
    if (oEvent.type == "mouseenter") {
        const iIndex = parseInt($(oEvent.target).attr('data-index'));
        if (iImageIndex !== iIndex) { // If not the currently chosen image
            $(oTooltip).css("display", "block");
            $(oTriangle).css("display", "block");
        }
    } else if (oEvent.type == "mouseleave") {
        $(oTooltip).css("display", "none");
        $(oTriangle).css("display", "none");
    }
});

/**
 * Emphasizing first image after page has been loaded.
 */
$(document).ready(function () {
    fEmphasizeThumbnail(0, -1);
});
