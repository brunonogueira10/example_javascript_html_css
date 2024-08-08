$(document).ready(function () {
    loadRSSFeed('https://rss.app/feeds/UcoDhnT7KbPqZR2l.xml');

    setTimeout(function () {
        alert('Seja Bem-Vindo!');
    }, 5000);

    $('#contact-form').on('submit', function (event) {
        if (!validateContactForm()) {
            event.preventDefault();
        }
    });
});

function loadRSSFeed(url) {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'xml',
        success: function (data) {
            var items = $(data).find('item');
            var output = '';
            items.each(function () {
                var title = $(this).find('title').text();
                var link = $(this).find('link').text();
                output += '<li><a href="' + link + '" target="_blank">' + title + '</a></li>';
            });
            $('#rss-feed').html(output);
        },
        error: function () {
            alert('Falha ao carregar o RSS. Tente novamente mais tarde.');
        }
    });
}

function loadContent(url) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            $('#content-area').html(data);
        },
        error: function () {
            alert('Falha ao carregar. Tente novamente mais tarde.');
        }
    });
}

function openModal(imageSrc, title, description) {
    var modal = $('#modal');
    var modalImage = $('#modal-image');
    var captionText = $('#caption');

    modal.show();
    modalImage.attr('src', imageSrc);
    modalImage.attr('alt', title);
    captionText.html('<strong>' + title + '</strong><br>' + description);
    modal.attr('aria-hidden', 'false');
    modal.attr('tabindex', '-1');
    modal.focus();
}

function closeModal() {
    var modal = $('#modal');
    modal.hide();
    modal.attr('aria-hidden', 'true');
}

function calculateQuote() {
    var pageType = $('#pageType').val();
    var deliveryTime = $('#deliveryTime').val();
    var sections = $('input[name="sections"]:checked');

    if (!pageType || !deliveryTime) {
        alert('Por favor , selecione o tipo de página e o tempo de entrega.');
        return;
    }

    var basePrice;
    switch (pageType) {
        case 'basic':
            basePrice = 500;
            break;
        case 'advanced':
            basePrice = 1000;
            break;
        case 'premium':
            basePrice = 1500;
            break;
        case 'custom':
            basePrice = 2000;
            break;
        default:
            alert('Tipo de página inválida.');
            return;
    }

    var extraSectionsCost = 0;
    sections.each(function () {
        extraSectionsCost += parseInt($(this).val());
    });

    var totalCost = basePrice + extraSectionsCost;

    if (deliveryTime && deliveryTime > 0) {
        var discount = Math.min(0.05 * deliveryTime, 0.20);
        totalCost *= (1 - discount);
    }

    $('#finalQuote').val('$' + totalCost.toFixed(2));
}

function validateContactForm() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var phone = $('#phone').val();
    var email = $('#email').val();
    var meetingDate = $('#meetingDate').val();
    var reason = $('#reason').val();

    if (!firstName || !lastName || !phone || !email || !meetingDate || !reason) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    return true;
}

// Initialize Leaflet map
var map = L.map('map').setView([41.15674568157044, -8.61013934185266], 13); // Coordenadas
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([41.15674568157044, -8.61013934185266]).addTo(map)
    .bindPopup('Nosso Escritório')
    .openPopup();
