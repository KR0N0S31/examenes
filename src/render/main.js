$(() => {
    const remote = require('electron').remote

    const is_fb = (n) => {
        n = parseInt(n)
        let a = 0, b = 1, c = 0
        while (c <= n){
            if (c == n){return true}
            c = a+b
            a = b
            b = c
        }
        return false
    }
    const is_prime = (n) => {
        n = parseInt(n)
        let c = 0
        for (let i = 1; i < n+1; i++) {
            if (n%i == 0){c++}
        }
        if (c>2 || n==1 || n==0){return false}
        else{return true}
    }
    const collect_data = () => {
        let form_data = JSON.parse(JSON.stringify(main_form.serializeArray()))
        form_data = {
            grupo: form_data[0].value,
            examen: form_data[1].value,
            punto: form_data[2].value,
        }
        return form_data
    }
    const factorial_sum = (n) => {
        n = parseInt(n)
        let c = n, suma
        for (let i = c-1; i > 0; i--) {
            suma = 0
            for (let j = 0; j < i; j++) {
                suma += n
            }
            n = suma
        }
        return n
    }

    const create_html_input_vector = (entrada, limite = false) => {
        let n = parseInt(entrada.val()), html = ""
        if (n>100 && !limite){entrada.val(100);n = 100}
        for (let i = 0; i < n; i++) {
            html += `<div class="form-group form-check-inline form-control-sm mb-0 my-box">
                        <div class="input-group-prepend form-control-sm">
                            <div class="input-group-text"><label class="form-check-label" for="input-${i}">Valor ${i}: </label></div>
                        </div>            
                        <input class="form-control" style="width: 90%;" type="number" required id="input-${i}">
                    </div>`
        }
        html += '<div class="form-group"><button type="submit" class="btn btn-primary form-control">Continuar</button><br></div>'
        return html
    }

    const create_html_input_matriz = (input_row, input_col) => {
        let row, col, tmp_row, table, tmp_table = "", table_head, html
        row = parseInt(input_row.val())
        col = parseInt(input_col.val())
        if (row > 30){input_row.val(30); row = 30}
        if (col > 30){input_col.val(30); col = 30}
        table_head = `<thead><tr><th scope="col">#</th>`
        for (let i = 0; i < col; i++) {
            table_head += `<th scope="col" class="text-muted bg-light">${i}</th>`
        }
        table_head += "</tr></thead><tbody>"
        for (let i = 0; i < row; i++) {
            tmp_row = `<tr><th scope="row" class="text-muted bg-light">${i}</th>`
            for (let j = 0; j < col; j++) {
                tmp_row += `<td class="text-muted bg-light"><input class="form-control" required type="number"></input></td>`         
            }
            tmp_row += "</tr>"
            tmp_table += tmp_row
        }
        tmp_table = table_head + tmp_table + "</tbody>"
        table = `
        <div>
            <table class="table">
                ${tmp_table}
            </table>
        </div>`
        html = table + '<div class="form-group"><button type="submit" class="btn btn-primary form-control">Continuar</button><br></div>'
        return html
    }

    const start_program = (data) => {
        if (data.grupo == 1 && data.examen == 1 && data.punto == 1){start_program_111()}
        else if (data.grupo == 1 && data.examen == 1 && data.punto == 2){start_program_112()}
        else if (data.grupo == 1 && data.examen == 2 && data.punto == 1){start_program_121()}
        else if (data.grupo == 1 && data.examen == 2 && data.punto == 2){start_program_122()}
        else if (data.grupo == 1 && data.examen == 3 && data.punto == 1){start_program_131()}
        else if (data.grupo == 1 && data.examen == 3 && data.punto == 2){start_program_132()}
        else if (data.grupo == 1 && data.examen == 4 && data.punto == 1){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 4 && data.punto == 2){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 4 && data.punto == 3){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 4 && data.punto == 4){program_not_implemented()}
        else if (data.grupo == 2 && data.examen == 1 && data.punto == 1){start_program_211()}
        else if (data.grupo == 2 && data.examen == 1 && data.punto == 2){start_program_212()}
        else if (data.grupo == 2 && data.examen == 2 && data.punto == 1){start_program_221()}
        else if (data.grupo == 2 && data.examen == 2 && data.punto == 2){start_program_222()}
        else if (data.grupo == 2 && data.examen == 3 && data.punto == 1){start_program_231()}
        else if (data.grupo == 2 && data.examen == 3 && data.punto == 2){start_program_232()}
        else if (data.grupo == 2 && data.examen == 4 && data.punto == 1){program_not_implemented()}
        else if (data.grupo == 2 && data.examen == 4 && data.punto == 2){program_not_implemented()}
        else if (data.grupo == 2 && data.examen == 4 && data.punto == 3){program_not_implemented()}
        else if (data.grupo == 2 && data.examen == 4 && data.punto == 4){program_not_implemented()}
        else {
            $.alert({
                title: 'Error!',
                content: 'Ocurrio un error con los datos seleccionados.',
            })
        }
    }
    const hide_all_programs = () => {
        let p = $(".program","#programs")
        for (let i = 0; i < p.length; i++) {
            $(p[i]).hide()
        }
    }
    const program_not_implemented = () => {
        $.alert({
            title: 'Error!',
            content: 'Este programa aún no se a implementado.',
        })
    }
    
    const start_program_111 = () => {
        hide_all_programs()
        $(".title").text("Ejercicio 1 del examen 1 del grupo 1")
        $(".description").html("<small>Se tiene n cantidad de números primos y Fibonacci, de los cuales los 2 primeros primos y Fibonacci son la base y altura de 2 triángulos.<br>Hallar el área de los triángulos con sumas y compararlos.</small>")
        $(".111").html(`<div class="form-group">
        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text"><label for="c_input_111">Cantidad de elementos a ingresar:</label></div>
            </div>
            <input type="number" class="form-control" id="c_input_111">
        </div>
    </div>
    <form class="order-column scroll"></form>`)
        $(".111").show()
        let input = $("#c_input_111")
        let form = $("form",".111")

        input.keyup(() => {
            form.html(create_html_input_vector(input))
        })
        form.submit((e) => {
            e.preventDefault()
            input.prop("disabled", true)
            let inputs = $("input", form), tmp, f = [], p = []
            for (const i of inputs) {
                if (is_fb($(i).val()) && f.length<2){
                    f.push(parseInt($(i).val()))
                }
                if (is_prime($(i).val()) && p.length<2){
                    p.push(parseInt($(i).val()))
                }
            }
            let triangulof = {
                base: f[0],
                altura: f[1],
                area: null
            }
            let triangulop = {
                base: p[0],
                altura: p[1],
                area: null
            }
            let area = 0
            if (triangulof.base && triangulof.altura){
                for (let i = 0; i < parseInt(triangulof.base); i++) {
                    area += parseInt(triangulof.altura)
                }
                area /= 2
                triangulof.area = area
                area = 0
            }
            if (triangulop.base && triangulop.altura){
                for (let i = 0; i < parseInt(triangulop.base); i++) {
                    area += parseInt(triangulop.altura)
                }
                area /= 2
                triangulop.area = area
                area = 0
            }
            let resultado = ""
            if (triangulof.area) {
                resultado += `<p>El triangulo formado por los Fibonaccis es:<br>
                base: ${triangulof.base}<br>
                altura: ${triangulof.altura}<br>
                area: ${triangulof.area}</p>
                `
            } else {
                resultado += `<p>Fibonaccis insuficientes para formar un triangulo</p>`
            }
            if (triangulop.area) {
                resultado += `<p>El triangulo formado por los primos es:<br>
                base: ${triangulop.base}<br>
                altura: ${triangulop.altura}<br>
                area: ${triangulop.area}</p>
                `
            } else {
                resultado += `<p>Primos insuficientes para formar un triangulo</p>`
            }
            if (triangulof.area || triangulop.area){

                resultado += `<p>El area mayor es ${Math.max(triangulof.area, triangulop.area)}</p>`
            } else {
                resultado += `<p>No se puede determinar el area mayor</p>`
            }
            $("form",".111").html(resultado)
        })
    }

    const start_program_112 = () => {
        hide_all_programs()
        $(".title").text("Ejercicio 2 del examen 1 del grupo 1")
        $(".112").html(`<div class="form-group">
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text"><label for="c_input_112">Cantidad de elementos a ingresar:</label></div>
                    </div>
                    <input type="number" class="form-control" id="c_input_112">
                </div>
            </div>
            <form class="order-column scroll"></form>`)
        $(".description").html(`<small>Se tiene una cantidad de n números, hallar el Fibonacci mayor y el primo menor y hallar el factorial de la diferencia de los 2 con sumas.</small>`)
        $(".112").show()
        let input = $("#c_input_112")
        let form = $("form",".112")
        input.keyup( () => {
            form.html(create_html_input_vector(input))
        })
        form.submit((e) => {
            e.preventDefault()
            input.prop("disabled", true)
            let mf = 0, mp = 0, resultado = "", mayor, menor
            let fm, pm
            let inputs = $("input", form)
            for (const i of inputs) {
                let val = parseInt(i.value)
                if (is_fb(val)){
                    if (mf == 0){
                        mayor = val
                        mf++
                    } else if ( val > mayor ){
                        mayor = val
                    }
                }
                if (is_prime(val)){
                    if (mp == 0){
                        menor = val
                        mp++
                    } else if (val < menor){
                        menor = val
                    }
                }
            }
            if (mayor && menor) {
                let dif = Math.abs(mayor - menor)
                let f = factorial_sum(dif)
                resultado = `<p>El mayor Fibonacci es: ${mayor}<br>`
                resultado += `El menor primo es: ${menor}<br>`
                resultado += `La diferencia entre el mayor Fibonacci y el menor primo es ${dif} y su factorial es ${f}</p>`
            } else {
                resultado = "<h5>Datos insuficientes para encontrar el factorial de la diferencia entre el mayor Fibonacci y el menor primo.</h5>"
            }
            $("form",".112").html(resultado)
        })
    }

    const start_program_121 = () => {
        hide_all_programs()
        $(".title").text("Ejercicio 1 del examen 2 del grupo 1")
        $(".121").html(`<div class="form-group">
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text"><label for="c_input_121">Cantidad de elementos a ingresar:</label></div>
                    </div>
                    <input type="number" class="form-control" id="c_input_121">
                </div>
            </div>
            <form class="order-column scroll"></form>`)
        $(".description").html(`<small>Se tienen dos vectores con igual número de elementos, formar un vector con los datos, donde la diferencia de los datos correspondientes de los dos vectores sea Fibonacci. No deben quedar repetidos.</small>`)
        $(".121").show()
        let input = $("#c_input_121"), cv = 0, v1 = [], v2 = [], v3 = [], resultado = ""
        let form = $("form",".121")
        const action = () => {
            form.html(create_html_input_vector(input))
        }
        input.keyup(action)
        form.submit((e) => {
            e.preventDefault()
            input.prop("disabled", true)
            cv++
            let inputs = $("input", form)
            if (cv == 1){
                for (let i = 0; i < inputs.length; i++) {
                    const element = parseInt(inputs[i].value)
                    v1.push(element)
                }
                action()
            } else {
                for (let i = 0; i < inputs.length; i++) {
                    const element = parseInt(inputs[i].value)
                    v2.push(element)
                }
                for (let i = 0; i < v1.length; i++) {
                    const element = Math.abs(v1[i] - v2[i])
                    if (is_fb(element)) {
                        v3.push(element)
                    }
                }
                v3 = Array.from(new Set(v3))
                form.html(`<p>
                El vector 1 es: ${JSON.stringify(v1)}<br>
                El vector 2 es: ${JSON.stringify(v2)}<br>
                El vector 3 es: ${JSON.stringify(v3)}<br>
                </p>`)
            }
        })

    }

    const start_program_122 = () => {
        hide_all_programs()
        $(".title").text("Ejercicio 2 del examen 2 del grupo 1")
        $(".122").html(`<div class="form-group">
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text"><label for="c_input_122">Cantidad de elementos a ingresar en el vector de rangos:</label></div>
                    </div>
                    <input type="number" class="form-control" id="c_input_122">
                </div>
            </div>
            <form class="order-column scroll"></form>`)
        $(".description").html(`<small>Se tiene un vector rango en el cual cada elemento indica la cantidad de elementos por rango en el vector de datos. Formar dos vectores con el promedio de los pares de cada rango, si no hay pares llenar ´0´ en la posición correspondiente y el vector 2 con el promedio de impares, llenar ´1´ si en el rango no hay impares</small>`)
        $(".122").show()
        let input = $("#c_input_122"), form = $("form", ".122"), cv = 0, vr = [], vd = [], cd = 0, vpp = [], vpi = []
        const action = (e) => {
            form.html(create_html_input_vector(input, true))
        }
        input.keyup(action)

        form.submit((e) => { 
            e.preventDefault()
            let inputs = $("input", form)
            cv++
            if (cv == 1) {
                input.prop("disabled", true)
                for (let i = 0; i < inputs.length; i++) {
                    const element = parseInt(inputs[i].value)
                    vr.push(element)
                }
                vr.forEach( i => { cd+=i })
                input.val(cd)
                $("label", ".122").text(`Cantidad de elementos del vector de datos:`)
                action()
            } else if (cv == 2){
                for (let i = 0; i < inputs.length; i++) {
                    const element = parseInt(inputs[i].value)
                    vd.push(element)
                }
                let lp = 0
                let sump, sumi, cntp, cnti
                vr.forEach(i => {
                    sump = 0, cntp = 0
                    sumi = 0, cnti = 0
                    for (let j = lp; j < i+lp; j++) {
                        const element = vd[j]
                        if (element %2 == 0){
                            sump += element
                            cntp += 1
                        } else {
                            sumi += element
                            cnti += 1
                        }
                    }
                    if (cntp != 0){
                        vpp.push(sump/cntp)
                    } else {
                        vpp.push(0)
                    }
                    if (cnti != 0){
                        vpi.push(sumi/cnti)
                    } else {
                        vpi.push(1)
                    }
                    lp += i
                })
                let resultado = `<p>
                El vector de rangos es: ${JSON.stringify(vr)}<br>
                El vector de datos es: ${JSON.stringify(vd)}<br>
                El vector con el promedio de los pares por cada rango es: ${JSON.stringify(vpp)}<br>
                El vector con el promedio de los impares por cada rango es: ${JSON.stringify(vpi)}
                </p>`
                form.html(resultado)
            }
        })
    }

    const start_program_131 = () => {
        hide_all_programs()
        $(".title").text("Ejercicio 1 del examen 3 del grupo 1")
        $(".131").html(`<div class="form-group vector-input">
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text"><label for="c_input_131">Cantidad de elementos a ingresar:</label></div>
                    </div>
                    <input type="number" class="form-control" id="c_input_131">
                </div>
            </div>
            <div class="form-group matriz-input">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><label for="c_input_131_f" class="row-ml">Cantidad de filas de la matriz:</label></div>
                        </div>
                        <input type="number" class="form-control row-m-i" id="c_input_131_f">
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><label for="c_input_131_c" class="col-ml">Cantidad de columnas de la matriz:</label></div>
                        </div>
                        <input type="number" class="form-control col-m-i" id="c_input_131_c">
                    </div>
                </div>
                <form class="order-column scroll"></form>`
        )
        $(".description").html(`<small>Se tiene un vector con datos, y una matriz donde aparecen varios de esos datos, mostrar cuantas veces aparecen en orden descendente por la cantidad de veces</small>`)
        $(".matriz-input").hide()
        $(".131").show()
        let input = $("#c_input_131")
        let form = $("form", ".131")
        let input_row = $("#c_input_131_f")
        let input_col = $("#c_input_131_c")
        let me = 0, html, matriz, vd = []
        const action = ()=>{
            if (me == 0){
                html = create_html_input_vector(input)
            } else {
                html = create_html_input_matriz(input_row, input_col)
            }
            form.html(html)
        }
        input.keyup(action)
        input_row.keyup(action)
        input_col.keyup(action)
        
        form.submit((e) => {
            e.preventDefault()
            me++
            if (me == 1){
                let inputs = $("input", form)
                form.html("")
                for (let i = 0; i < inputs.length; i++) {
                    const element = parseInt(inputs[i].value)
                    if ( vd.filter( (tmp) => (tmp.numero == element)).length == 0 ) {
                        vd.push({
                            numero: element,
                            repeticiones: 0
                        })
                    }
                }
                $(".vector-input").hide()
                $(".matriz-input").show()
            } else {
                input.prop("disabled", true)
                input_row.prop("disabled", true)
                input_col.prop("disabled", true)
                let tbody = $("tbody", form)
                let rows = $("tr", tbody)
                let cols, inputs_row
                let matriz_tmp = []
                for (const i of rows){
                    cols = $("td", i)
                    inputs_row = []
                    for (const j of cols) {
                        inputs_row.push(parseInt($("input", j).val()))
                    }
                    matriz_tmp.push(inputs_row)
                }
                matriz = matriz_tmp
                matriz.forEach(i => {
                    i.forEach(j => {
                        if (vd.filter((tmp) => (tmp.numero == j)).length > 0) {
                            const element = vd.find( (tmp) => tmp.numero == j )
                            element.repeticiones += 1
                        }
                    })
                })
                vd.sort( (a, b) => {
                    return (b.repeticiones - a.repeticiones)
                })
                let resultado = "<p>Los elementos del vector de datos que se repiten en la matriz son:"
                vd.forEach(element => {
                    resultado += `<br>Numero: ${element.numero} Repeticiones: ${element.repeticiones}`
                })
                resultado += "</p>"
                form.html(resultado)
            }
        })
    }

    const start_program_132 = () => {
        hide_all_programs()
        $(".132").html(`
            <div class="form-group">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><label for="c_input_132_f" class="row-ml">Cantidad de filas de la matriz 1:</label></div>
                    </div>
                    <input type="number" class="form-control row-m-i" id="c_input_132_f">
                </div>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><label for="c_input_132_c" class="col-ml">Cantidad de columnas de la matriz 1:</label></div>
                    </div>
                    <input type="number" class="form-control col-m-i" id="c_input_132_c">
                </div>
            </div>
            <form class="order-column scroll"></form>`)
        $(".title").text("Ejercicio 1 del examen 3 del grupo 2")
        $(".description").html("<small>Se tiene 2 matrices, formar 2 vectores con los primos comunes de las filas impares de las 2 matrices y con los Fibonacci de las pares sin repetidos, las matrices tienen igual número de filas.</small>")
        $(".132").show()
        let label_row = $(".row-ml", ".132")
        let label_col = $(".col-ml", ".132")
        let input_row = $("#c_input_132_f")
        let input_col = $("#c_input_132_c")
        let form = $("form",".132")
        let cm = 0, matriz1, matriz2, vp, vf, spm1 = new Set(), spm2 = new Set(), sfm1 = new Set(), sfm2 = new Set()

        input_col.keyup( () => { form.html(create_html_input_matriz(input_row, input_col)) } )
        input_row.keyup( () => { form.html(create_html_input_matriz(input_row, input_col)) } )

        form.submit((e) => {
            e.preventDefault()
            let tbody = $("tbody", form)
            let rows = $("tr", tbody)
            let cols, inputs_row
            let matriz_tmp = []
            for (const i of rows){
                cols = $("td", i)
                inputs_row = []
                for (const j of cols) {
                    inputs_row.push(parseInt($("input", j).val()))
                }
                matriz_tmp.push(inputs_row)
            }
            if (cm == 0){
                matriz1 = matriz_tmp
                label_row.text("Cantidad de filas de la matriz 2:")
                label_col.text("Cantidad de columnas de la matriz 2:")
                input_row.prop("disabled", true)
                input_col.val("")
                form.html(create_html_input_matriz(input_row, input_col))
            } else {
                matriz2 = matriz_tmp
                label_row.text("Se llenaron las 2 matrices.")
                label_col.text("Se llenaron las 2 matrices.")
                input_row.prop("disabled", true)
                input_col.prop("disabled", true)
                input_row.val("")
                input_col.val("")
                for (let i = 0; i < matriz1.length; i++) {
                    const row = matriz1[i]
                    for (let j = 0; j < row.length; j++) {
                        const element = row[j]
                        if ( i%2 == 0 && is_fb(element)) {
                            sfm1.add(element)
                        } else if (is_prime(element)) {
                            spm1.add(element)
                        }   
                    }
                }
                for (let i = 0; i < matriz2.length; i++) {
                    const row = matriz2[i]
                    for (let j = 0; j < row.length; j++) {
                        const element = row[j]
                        if ( i%2 == 0 && is_fb(element)) {
                            sfm2.add(element)
                        } else if (is_prime(element)) {
                            spm2.add(element)
                        }   
                    }
                }
                vf =  Array.from(new Set([...sfm1].filter(x => sfm2.has(x))))
                vp =  Array.from(new Set([...spm1].filter(x => spm2.has(x))))
                form.html(`<p>
                    El vector de Fibonaccis es: ${JSON.stringify(vf)}<br>
                    El vector de primos es ${JSON.stringify(vp)}
                    </p>`)
            }
            cm++
        })
    }

    const start_program_211 = () => {
        hide_all_programs()
        $(".title").text("Ejercicio 1 del examen 1 del grupo 2")
        $(".211").html(`<div class="form-group">
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text"><label for="c_input_211">Cantidad de elementos a ingresar:</label></div>
                    </div>
                    <input type="number" class="form-control" id="c_input_211">
                </div>
            </div>
            <form class="order-column scroll"></form>`)
        $(".description").html(`<small>Se tiene una cantidad de números, en donde hay varios números primos y Fibonacci, lo cual se requiere determinar si los tres primeros Fibonacci son consecutivos y los 2 primeros primos son consecutivos en la secuencia de primos</small>`)
        $(".211").show()
        let input = $("#c_input_211")
        let form = $("form",".211")
        input.keyup(() => {
            form.html(create_html_input_vector(input))
        })
        form.submit((e) => {
            e.preventDefault()
            input.prop('disabled', true)
            let mf = 0, mp = 0, resultado = ""
            let f1 = -1000, f2 = -1000, f3 = -1000, p1 = null, p2 = null
            let inputs = $("input", form)
            for (let i = 0; i < inputs.length; i++) {
                const element = parseInt(inputs[i].value)
                if (is_fb(element)){
                    if (mf == 0){
                        f1 = element
                        mf++
                    } else if (mf == 1){
                        f2 = element
                        mf++
                    } else if (mf == 2){
                        f3 = element
                        mf++
                    }
                }
                if (is_prime(element)){
                    if (mp == 0){
                        p1 = element
                        mp++
                    } else if (mp == 1){
                        p2 = element
                        mp++
                    }
                }
            }
            if ((f1+f2==f3 || f1+f3==f2 || f2+f3==f1) && f1!=f2 && f1!=f3 && f2!=f3){
                resultado += `<p>Los 3 primeros fibonaccis ingresados son consecutivos.</p>`
            } else {
                resultado += `<p>Los 3 primeros fibonaccis ingresados <strong>NO</strong> son consecutivos.</p>`
            }
            let max_prime = Math.max(p1, p2)
            let min_prime = Math.min(p1, p2)
            let p, cp, pa, resultado_tmp
            if (max_prime != min_prime) {
                p = 1
                for (let i = 1; i <= max_prime; i++) {
                    cp = 0
                    for (let j = 1; j <= i; j++) {
                        if (i%j==0) {
                            cp+=1
                        }
                    }
                    if (cp<3) {
                        pa = p
                        p = i
                    }
                    if (pa==min_prime && p == max_prime){
                        resultado_tmp = `<p>Los 2 primeros primos ingresados son consecutivos.</p>`
                    } else {
                        resultado_tmp = `<p>Los 2 primeros primos ingresados <strong>NO</strong> son consecutivos.</p>`
                    }
                }
            } else {
                resultado_tmp = `<p>Los 2 primeros primos ingresados <strong>NO</strong> son consecutivos.</p>`
            }
            resultado += resultado_tmp
            $("form",".211").html(resultado)
        }
    )}

    const start_program_212 = () => {
        hide_all_programs()
        $(".title").text("Ejercicio 2 del examen 1 del grupo 2")
        $(".212").html(`<div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><label for="c_input_212">Cantidad de elementos a ingresar:</label></div>
                                    </div>
                                    <input type="number" class="form-control" id="c_input_212">
                                </div>
                            </div>
                            <form class="order-column scroll"></form>`)
        $(".description").html(`<small>Se tiene una cantidad de datos numéricos y se solicita determinar el promedio de los números Fibonacci que están en el rango determinado por el mayor y menor de estos datos</small>`)
        $(".212").show()
        let input = $("#c_input_212")
        let form = $("form",".212") 
        input.keyup(() => {
            form.html(create_html_input_vector(input))
        })
        form.submit((e)=>{
            input.prop("disabled", true)
            e.preventDefault()
            let inputs = $("input", form)
            let mn = 0, ma = null, me = null, resultado = ""
            for (let i = 0; i < inputs.length; i++) {
                const element = parseInt(inputs[i].value)
                if (mn == 0) {
                    ma = element, me = element, mn = 1
                }
                if (element > ma){
                    ma = element
                }
                if (element < me){
                    me = element
                }
            }
            let fa = 0, sumf = 0, fb = 1, cf = 0, fc = 0, pf
            if (ma != null && ma != null && ma != me) {
                while (fc <= ma) {
                    if (fc >= me && fc <= ma) {
                        cf++
                        sumf += fc
                    }
                    fa = fb
                    fb = fc
                    fc = fa + fb
                }
                if (cf > 0) {
                    pf = sumf/cf
                    resultado += `<p>El promedio de los fibonacci entre ${me} y ${ma} es: ${pf}.</p>`
                } else {
                    resultado += `<p>No se encontro ningun fibonacci entre ${me} y ${ma}.</p>`
                }
            } else {
                resultado += `<p>Entradas insuficientes para crear un rango.</p>`
            }
            $("form",".212").html(resultado)
        })
    }

    const start_program_221 = ()=>{
        hide_all_programs()
        let cv = 0
        $(".221").html(`<div class="form-group">
        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text"><label for="c_input_221">Cantidad de elementos a ingresar en el vector:</label></div>
            </div>
            <input type="number" class="form-control" id="c_input_221">
        </div>
    </div>
    <form class="order-column scroll"></form>`)
        $(".title").text("Ejercicio 1 del examen 2 del grupo 2")
        $("label", ".221").text(`Cantidad de elementos a ingresar en el vector ${cv+1}:`)
        let form = $("form", ".221")
        $(".description").html(`<small>Se tienen 3 vectores con datos numéricos, formar un cuarto vector con los Fibonacci comunes sin repetidos</small>`)
        $(".221").show()
        let vector1 = [], vector2 = [], vector3 = []
        let input = $("#c_input_221")
        input.keyup(()=>{
            if ( cv < 3 ){
                form.html(create_html_input_vector(input))
            }
        })
        form.submit((e)=>{
            e.preventDefault()
            let inputs = $("input", form)
            for (let i = 0; i < inputs.length; i++) {
                const element = parseInt(inputs[i].value)
                if (cv == 0 ){
                    vector1.push(element)
                }else if (cv == 1){
                    vector2.push(element)
                }else if (cv == 2){
                    vector3.push(element)
                }
            }
            form.html("")
            if (cv == 2){
                $("label", ".221").text(`Se llenaron los 3 vectores`)
                $("#c_input_221").val("")
                $("#c_input_221").prop("disabled", true)
                let vector4 = []
                let resultado
                for (const i in vector1) {
                    const element = vector1[i]
                    if (is_fb(element) && vector2.includes(element) && vector3.includes(element) && !vector4.includes(element) ) {
                        vector4.push(element)
                    }
                }
                resultado = `<p>EL vector 4 es: ${JSON.stringify(vector4)} </p>`
                form.html(resultado)
            } else {
                cv++
                if (cv < 3){
                    $("label", ".221").text(`Cantidad de elementos a ingresar en el vector ${cv+1}:`)
                    $("#c_input_221").val("")
                }
            }
        })
    }
    const start_program_222 = () => {
        hide_all_programs()
        $(".222").html(`<div class="form-group">
        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <div class="input-group-text"><label for="c_input_222">Cantidad de elementos a ingresar en el vector:</label></div>
            </div>
            <input type="number" class="form-control" id="c_input_222">
        </div>
    </div>
    <form class="order-column scroll"></form>`)
        $(".title").text("Ejercicio 2 del examen 2 del grupo 2")
        $(".description").html(`<small>Los primos del primer vector indican los números de elementos de un rango en el vector datos que se deben recorrer. Formar 2 vectores con el promedio de primos en cada rango y promedio de pares. Si no hay primos colocar (0) si no hay pares colocar (1)</small>`)
        let lable = $("label", ".222")
        lable.text("Cantidad de elementos a ingresar en el vector con primos:")
        $(".222").show()
        let vcp = [], vr = [], vd = [], cv = 0, cd = 0
        let input = $("#c_input_222")
        let form = $("form",".222")
        const action = ()=>{
            if ( cv == 0 ){
                form.html(create_html_input_vector(input))
            }
        }
        input.keyup(action)
        form.submit((e)=>{
            e.preventDefault()
            let inputs = $("input", form)
            for (let i = 0; i < inputs.length; i++) {
                const element = parseInt(inputs[i].value)
                if (cv == 0 ){
                    vcp.push(element)
                }else if (cv == 1){
                    vd.push(element)
                }
            }
            form.html("")
            if (cv == 0){
                input.val("")
                input.prop("disabled", true)
                for (const i in vcp) {
                    const tmp = vcp[i]
                    if (is_prime(tmp)) {
                        cd += tmp
                        vr.push(tmp)
                    }
                }
                lable.text(`Cantidad de elementos a ingresar en el vector de datos:`)
                input.prop("disabled", true)
                input.val(cd)
                action()
            } else if (cv == 1){
                lable.text(`Se llenaron los 2 vectores`)
                input.val("")
                let vpri = [], vpar = [], lp = -1
                let cpri, spri, cpar, spar, ip, ppri, ppar, tmp2
                for (const tmp in vr) {
                    const i = vr[tmp]
                    cpri = 0, spri = 0, cpar = 0, spar = 0, ip = lp + 1
                    for (let k = ip; k < ip+i; k++) {
                        lp += 1
                        tmp2 = vd[k]
                        if (is_prime(tmp2)){
                            cpri += 1
                            spri += tmp2
                        }
                        if (tmp2%2 == 0){
                            cpar += 1
                            spar += tmp2
                        }
                    }
                    if (cpri == 0){
                        vpri.push(0)
                    } else {
                        ppri = spri / cpri
                        vpri.push(ppri)
                    }
                    if (cpar == 0){
                        vpar.push(1)
                    } else {
                        ppar = spar / cpar
                        vpar.push(ppar)
                    }
                }
                let resultado = `<p>El vector con los promedios de primos es: ${JSON.stringify(vpri)}<br>El vector con los promedios de pares es: ${JSON.stringify(vpar)}</p>`
                form.html(resultado)
            }
            cv++
        })

    }

    const start_program_231 = () => {
        hide_all_programs()
        $(".231").html(`
            <div class="form-group">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><label for="c_input_231_f" class="row-ml">Cantidad de filas de la matriz 1:</label></div>
                    </div>
                    <input type="number" class="form-control row-m-i" id="c_input_231_f">
                </div>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><label for="c_input_231_c" class="col-ml">Cantidad de columnas de la matriz 1:</label></div>
                    </div>
                    <input type="number" class="form-control col-m-i" id="c_input_231_c">
                </div>
            </div>
            <form class="order-column scroll"></form>`)
        $(".title").text("Ejercicio 1 del examen 3 del grupo 2")
        let label_row = $(".row-ml", ".231")
        let label_col = $(".col-ml", ".231")
        let input_row = $("#c_input_231_f")
        let input_col = $("#c_input_231_c")
        $(".description").html("<small>Se tienen 2 matrices en la primera matriz hay números de Fibonacci con los cuales se debe determinar las veces que se repiten en la segunda matriz y determinar el que más y menos se repite</small>")
        $(".231").show()
        let form = $("form",".231")
        let matriz1, matriz2, m = 0

        input_row.keyup(() => {form.html(create_html_input_matriz(input_row, input_col))})
        input_col.keyup(() => {form.html(create_html_input_matriz(input_row, input_col))})
        
        form.submit((e)=>{
            e.preventDefault()
            let tbody = $("tbody", form)
            let rows = $("tr", tbody)
            let cols, inputs_row
            let matriz_tmp = []
            for (const i of rows){
                cols = $("td", i)
                inputs_row = []
                for (const j of cols) {
                    inputs_row.push(parseInt($("input", j).val()))
                }
                matriz_tmp.push(inputs_row)
            }
            if(m == 0){
                matriz1 = matriz_tmp
                input_row.val("")
                input_col.val("")
                label_row.text(`Cantidad de filas de la matriz 2:`)
                label_col.text(`Cantidad de columnas de la matriz 2:`)
                form.html("")
            } else if (m = 1){
                matriz2 = matriz_tmp
                input_row.val("")
                input_col.val("")
                label_row.text(`Se llenaron las 2 matrices`)
                label_col.text(`Se llenaron las 2 matrices`)
                input_row.prop("disabled", true)
                input_col.prop("disabled", true)
                let vf = [], vr = [], mayor, menor, resultado
                for (const i of matriz1) {
                    for (const j of i) {
                        if(is_fb(j)){
                            vf.push(j)
                        }
                    }
                }
                vf = Array.from(new Set(vf))
                for (const i of vf) {
                    vr.push(0)
                }
                for (const i of matriz2) {
                    for (const j of i) {
                        if (is_fb(j) && vf.includes(j)) {
                            vr[vf.indexOf(j)] += 1
                        }
                    }
                }
                mayor = vf[vr.indexOf(Math.max(...vr))]
                menor = vf[vr.indexOf(Math.min(...vr))]
                resultado = "<p>"
                for (let i = 0; i < vf.length; i++) {
                    resultado += `El fibonacci ${vf[i]} se repitio ${vr[i]} veces en la segunda matriz<br>`
                }
                resultado += `El fibonacci que mas se repitio fue ${mayor}<br>`
                resultado += `El fibonacci que menos se repitio fue ${menor}`
                resultado += "</p>"
                form.html(resultado)
            }
            m++
        })
    }

    const start_program_232 = () => {
        hide_all_programs()
        $(".232").html(`
            <div class="form-group">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><label for="c_input_232_f" class="row-ml">Cantidad de filas de la matriz:</label></div>
                    </div>
                    <input type="number" class="form-control row-m-i" id="c_input_232_f">
                </div>
            </div>
            <form class="order-column scroll"></form>`)
        $(".title").text("Ejercicio 2 del examen 3 del grupo 2")
        let label_row = $(".row-ml", ".232")
        let label_col = $(".col-ml", ".232")
        let input_row = $("#c_input_232_f")
        let input_col = input_row
        $(".description").html("")
        $(".232").show()
        let form = $("form",".232")

        input_col.keyup( () => { form.html(create_html_input_matriz(input_row, input_col)) } )
        input_row.keyup( () => { form.html(create_html_input_matriz(input_row, input_col)) } )
        
        form.submit((e) => {
            e.preventDefault()
            let matriz
            let row, col, tmp_row, table, tmp_table = "", html, table_head
            input_row.prop('disabled', true)
            input_col.prop('disabled', true)
            row = parseInt(input_row.val())
            col = parseInt(input_col.val())
            let tbody = $("tbody", form)
            let rows = $("tr", tbody)
            let cols, inputs_row
            let matriz_tmp = []
            for (const i of rows){
                cols = $("td", i)
                inputs_row = []
                for (const j of cols) {
                    inputs_row.push(parseInt($("input", j).val()))
                }
                matriz_tmp.push(inputs_row)
            }
            matriz = matriz_tmp
            
            let tmp, aux
            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[0].length; j++) {
                    tmp = matriz[i][j]
                    if (j>i && is_prime(tmp)) {
                        if (!is_prime(matriz[j][i])) {
                            aux = matriz[i][j]
                            matriz[i][j] = matriz[j][i]
                            matriz[j][i] = aux
                        } else {
                            matriz[i][j] = 4
                        }
                    }
                }
            }
            
            table_head = `<thead><tr><th scope="col">#</th>`
            for (let i = 0; i < col; i++) {
                table_head += `<th scope="col" class="text-muted bg-light">${i}</th>`
            }
            table_head += "</tr></thead><tbody>"
            for (let i = 0; i < row; i++) {
                tmp_row = `<tr><th scope="row" class="text-muted bg-light">${i}</th>`
                for (let j = 0; j < col; j++) {
                    tmp_row += `<td class="text-muted bg-light"><spam>${matriz[i][j]}</spam></input></td>`         
                }
                tmp_row += "</tr>"
                tmp_table += tmp_row
            }
            tmp_table = table_head + tmp_table + "</tbody>"
            table = `
            <div class="table-responsive">
                <table class="table">
                    ${tmp_table}
                </table>
            </div>`
            form.html(table)
        })
    }

    $("#exit_button").click(() => {
        $.confirm({
            theme: 'supervan',
            title: 'Salir',
            content: 'Seguro que quieres salir?',
            buttons: {
                no: () => {},
                si: () => {remote.app.showExitPrompt = false;window.close()},
            },
        })
    })

    hide_all_programs()
    let radio = $('input[type=radio]')
    let main_form = $("#main_form")
    radio.change((e) => {
        let form_data = collect_data()
        let submit_button = $("#submit_main")
        let error_text = $("#form_errors")
        if (form_data.examen == 4){
            $(".radio-hidden").removeClass('d-none')
        } else if (form_data.punto == 3 || form_data.punto == 4) {
            $("#punto1").prop('checked', true)
            $(".radio-hidden").addClass('d-none')
        } else {
            $(".radio-hidden").addClass('d-none')
        }
    })
    main_form.submit((e) => {
        e.preventDefault()
        start_program(collect_data())
    })

    $(document).keypress((e) => {
        if (e.which === 4 || e.which === 9) {
            remote.getCurrentWindow().toggleDevTools()
        }
    })
})