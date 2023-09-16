    $(document).ready(function () {
        const texto = $('input')
        const btnInsert = $('.divInsert button')
        const btnDeleteAll = $('.header button')
        const ul = $('ul')
    
        var itensDB = []
    
        btnDeleteAll.on('click', function () {
        itensDB = []
        updateDB()
        })
    
        texto.on('keypress', function (e) {
        if (e.key === 'Enter' && texto.val() !== '') {
            setItemDB()
        }
        })
    
        btnInsert.on('click', function () {
        if (texto.val() !== '') {
            setItemDB()
        }
        })
    
        function setItemDB() {
        if (itensDB.length >= 20) {
            alert('Limite máximo de 20 itens atingido!')
            return
        }
    
        itensDB.push({ item: texto.val(), status: '' })
        updateDB()
        }
    
        function updateDB() {
        localStorage.setItem('todolist', JSON.stringify(itensDB))
        loadItens()
        }
    
        function loadItens() {
        ul.html('')
        itensDB = JSON.parse(localStorage.getItem('todolist')) || []
        itensDB.forEach(function (item, i) {
            insertItemTela(item.item, item.status, i)
        })
        }
    
        function insertItemTela(text, status, i) {
        const li = $('<li></li>')
    
        li.html(`
            <div class="divLi">
            <input type="checkbox" ${status} data-i=${i} />
            <span data-si=${i}>${text}</span>
            <button data-i=${i}><i class='bx bx-trash'></i></button>
            </div>
        `)
        ul.append(li)
    
        if (status === 'checked') {
            $(`[data-si="${i}"]`).addClass('line-through')
            li.find('input').prop('checked', true); // Marcar a caixa de seleção se estiver completo
        }
    
        li.find('input').on('change', function () {
            done(this, i);
        });
    
        li.find('button').on('click', function () {
            removeItem(i);
        });
    
        texto.val('')
        }
    
        function done(chk, i) {
        if (chk.checked) {
            itensDB[i].status = 'checked'
            $(`[data-si="${i}"]`).addClass('line-through')
        } else {
            itensDB[i].status = ''
            $(`[data-si="${i}"]`).removeClass('line-through')
        }
    
        updateDB()
        }
    
        function removeItem(i) {
        itensDB.splice(i, 1)
        updateDB()
        }
    
        loadItens()
    })
