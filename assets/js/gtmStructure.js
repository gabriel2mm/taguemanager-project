var pageCurrentGTM = $('.bs-breadcrumb-refactored').find('ul li').last().text().trim();
var pagesGTM = $('.bs-breadcrumb-refactored').find('ul li')
var nomeGTM = 'portal-institucional:' + getProductGTM(pagesGTM) + ':' + pageCurrentGTM + ':início';

document.addEventListener("DOMContentLoaded", function(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 
        'event' : "pageView", 
        'page' : {
        'pagePath' : document.location.pathname,
        'titulo': document.title,
        'ambiente': 'portal-institucional',
        'produto' : getProductGTM(pagesGTM),
        'funcionalidade': pageCurrentGTM,
        'detalhe' : 'início',
        'nome': nomeGTM,
        'perfil-plano': '[perfil-plano]'
    }});
});

function getProductGTM(page){
    var objectProductsBreadCrumb = ['Plano de Saúde para Empresas', 'Plano Dental', 'Seguro Auto', 'Seguro de Vida Para Você', 
    'Seguro Residencial', 'Cartão de Crédito', 'Títulos de Capitalização', 'Seguro Patrimonial'];
    var objectProducts = ['Saúde', 'Dental', 'Auto', 'Vida', 'Residencial', 'Cartões', 'Capitalização', 'Patrimonial'];
    var resultProduct = "";
    if(page.length != 0){
        $(page).each(function(indexPage,valuePage) {
            $(objectProductsBreadCrumb).each(function(index,value) {
                $(valuePage).text().trim().toLowerCase() == value.toLowerCase() ? resultProduct = objectProducts[index] : null
            })
            resultProduct == "" ? resultProduct = $(valuePage).text().trim() : null;
        });
    }else{
        switch(document.location.pathname){
            case '/clientes/voip':
                resultProduct = 'Voip'
                break;
            default: 
                resultProduct = 'Home'
                break;
        }
    }
    return resultProduct;
}

/*Capturar evento click de todos os links da página*/
$('body').find('a').on('click', function(value){
    var templateCurrent = $(this);
    var textLinkItemGTM = $(this).text();
    var linkItemGTM = $(this).attr('href');

    if($(templateCurrent).css("display") != 'none'){
        if($(templateCurrent).attr('title') != null && $(templateCurrent).attr('title') != ""){
            textLinkItemGTM = $(templateCurrent).attr('title');
        }else{
            if($(templateCurrent).find('.button-content').length != 0){
                textLinkItemGTM = $(templateCurrent).find('.button-content').text().trim();
            }else if($(templateCurrent).find('.bs-button-link').length != 0){
                textLinkItemGTM = $(templateCurrent).find('.bs-button-link').text().trim();
            }else{
                textLinkItemGTM = $(templateCurrent).text().trim();
            }
        }
        console.log('Nome do link : ' + textLinkItemGTM + ' HREF: ' + linkItemGTM) 
        textLinkItemGTM != "" ? pushInteractionGTMLink(textLinkItemGTM, linkItemGTM) : null
    }
})

/*Capturar evento click de todos os botões da página*/
$('body').find('button').on('click', function(value){
    var templateCurrentButton = $(this);
    var textButtonGTM = "";
    if($(templateCurrentButton).css("display") != 'none'){
        if($(templateCurrentButton).attr('title') != null && $(templateCurrentButton).attr('title') != ""){
            textButtonGTM = $(templateCurrentButton).attr('title').trim();;
        }else{
            textButtonGTM = $(templateCurrentButton).text().trim();
        }
        console.log('Nome do botao : ' + textButtonGTM) 
        textButtonGTM != "" ? pushInteractionGTMButton(textButtonGTM) :  null
    }
})

function pushInteractionGTMLink(textLink, linkItem){
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'interaction',
        'custom':{
        'category': nomeGTM,
        'action':'click:link',
        'label': textLink,
        'link': 'link-' + linkItem
    }});
}

function pushInteractionGTMButton(textLink){
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'interaction',
        'custom':{
        'category': nomeGTM,
        'action':'click:button',
        'label': textLink,
    }});
}