var pageCurrentGTM = $('.bs-breadcrumb-refactored').find('ul li').last().text().trim();
var pagesGTM = $('.bs-breadcrumb-refactored').find('ul li')

document.addEventListener("DOMContentLoaded", function(){
    var nomeGTM = 'portal-institucional:' + getProductGTM(pagesGTM) + ':' + pageCurrentGTM + ':início';
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


