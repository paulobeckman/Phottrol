const Mask = {
    apply(input, func){
        setTimeout(function(){
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value){
        value = value.replace(/\D/g,"")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    }
}


function paginate(selectedPage, totalPages) {
    
    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        } else {
            if(filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}
const pagination = document.querySelector(".pagination")

if(pagination) {
    createPagination(pagination)
}


function addEmployees() {
    const employees = document.querySelector("#employees_create");
    const fieldContainer = document.querySelectorAll (".employee");

    const newField = fieldContainer[fieldContainer.length -1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    employees.appendChild(newField);
}

document
    .querySelector(".add-employees")
    .addEventListener("click", addEmployees)

function addEquipments(){
    const equipments = document.querySelector("#equipments_create")
    const fieldContainer = document.querySelectorAll(".equipment")

    const newField = fieldContainer[fieldContainer.length -1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].values = "";
    equipments.appendChild(newField);
}

document
    .querySelector(".add-equipment")
    .addEventListener("click", addEquipments)
