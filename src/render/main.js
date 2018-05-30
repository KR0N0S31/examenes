$(() => {
    const nodeConsole = require('console')
    let myConsole = new nodeConsole.Console(process.stdout, process.stderr)

    const is_fb = (n) => {
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
        let c = 0
        for (let i = 1; i < n+1; i++) {
            if (n%i == 0){c++}
        }
        if (c>2 || n==1 || n==0){return false}
        else{return true}
    }
    const collect_data = () => {
        let form_data = JSON.parse(JSON.stringify(form.serializeArray()))
        form_data = {
            grupo: form_data[0].value,
            examen: form_data[1].value,
            punto: form_data[2].value,
        }
        return form_data
    }
    const start_program = (data) => {
        if (data.grupo == 1 && data.examen == 1 && data.punto == 1){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 1 && data.punto == 2){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 2 && data.punto == 1){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 2 && data.punto == 2){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 3 && data.punto == 1){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 3 && data.punto == 2){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 4 && data.punto == 1){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 4 && data.punto == 2){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 4 && data.punto == 3){program_not_implemented()}
        else if (data.grupo == 1 && data.examen == 4 && data.punto == 4){program_not_implemented()}
        else if (data.grupo == 2 && data.examen == 1 && data.punto == 1){start_program_211()}
        else if (data.grupo == 2 && data.examen == 1 && data.punto == 2){start_program_212()}
        else if (data.grupo == 2 && data.examen == 2 && data.punto == 1){start_program_221()}
        else if (data.grupo == 2 && data.examen == 2 && data.punto == 2){start_program_222()}
        else if (data.grupo == 2 && data.examen == 3 && data.punto == 1){start_program_231()}
        else if (data.grupo == 2 && data.examen == 3 && data.punto == 2){program_not_implemented()}
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
        $(".211").show()
        let input = $("#c_input_211")
        input.keyup(() => {
            let html = ""
            for (let i = 0; i < input.val(); i++) {
                html += `<div class="form-group form-check-inline form-control-sm mb-0 my-box">
                            <div class="input-group-prepend form-control-sm">
                                <div class="input-group-text"><label class="form-check-label" for="input-${i}">Valor ${i}: </label></div>
                            </div>            
                            <input class="form-control" style="width: 90%;" type="number" required id="input-${i}">
                        </div>`
            }
            html += '<div class="form-group"><button type="submit" class="btn btn-primary form-control">Continuar</button><br></div>'
            $("form", ".211").html(html)
        })
        let form = $("form",".211")
        form.submit((e) => {
            e.preventDefault()
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
        $(".212").show()
        let input = $("#c_input_212")
        input.keyup(() => {
            let html = ""
            for (let i = 0; i < input.val(); i++) {
                html += `<div class="form-group form-check-inline form-control-sm mb-0 my-box">
                            <div class="input-group-prepend form-control-sm">
                                <div class="input-group-text"><label class="form-check-label" for="input-${i}">Valor ${i}: </label></div>
                            </div>            
                            <input class="form-control" style="width: 90%;" type="number" required id="input-${i}">
                        </div>`
            }
            html += '<div class="form-group"><button type="submit" class="btn btn-primary form-control">Continuar</button><br></div>'
            $("form", ".212").html(html)
        })
        let form = $("form",".212") 
        form.submit((e)=>{
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
        form.html("")
        $(".221").show()
        let vector1 = [], vector2 = [], vector3 = []
        let input = $("#c_input_221")
        input.keyup(()=>{
            let html = ""
            if ( cv < 3 ){
                for (let i = 0; i < input.val(); i++) {
                    html += `<div class="form-group form-check-inline form-control-sm mb-0 my-box">
                                <div class="input-group-prepend form-control-sm">
                                    <div class="input-group-text"><label class="form-check-label" for="input-${i}">Valor ${i}: </label></div>
                                </div>            
                                <input class="form-control" style="width: 90%;" type="number" required id="input-${i}">
                            </div>`
                }
                html += '<div class="form-group"><button type="submit" class="btn btn-primary form-control">Continuar</button><br></div>'
                form.html(html)
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
                let resultado = `<p>El vector 4 seria: [ `
                for (const i in vector1) {
                    const element = vector1[i]
                    if (is_fb(element) && vector2.includes(element) && vector3.includes(element) && !vector4.includes(element) ) {
                        vector4.push(element)
                    }
                }
                for (const i in vector4){
                    resultado += `${vector4[i]},`
                }
                resultado += `]</p>`
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
        let lable = $("label", ".222")
        lable.text("Cantidad de elementos a ingresar en el vector con primos:")
        $(".222").show()
        let vcp = [], vr = [], vd = [], cv = 0, cd = 0
        let input = $("#c_input_222")
        let form = $("form",".222")
        const action = ()=>{
            let html = ``
            if ( cv == 0 ){
                for (let i = 0; i < input.val(); i++) {
                    html += `<div class="form-group form-check-inline form-control-sm mb-0 my-box">
                    <div class="input-group-prepend form-control-sm">
                        <div class="input-group-text"><label class="form-check-label" for="input-${i}">Valor ${i}: </label></div>
                    </div>            
                    <input class="form-control" style="width: 90%;" type="number" required id="input-${i}">
                </div>`
                }
                html += '<div class="form-group"><button type="submit" class="btn btn-primary form-control">Continuar</button><br></div>'
                form.html(html)
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
                let resultado = `<p>El vector con los promedios de primos es: [ `
                for (const i in vpri){
                    resultado += `${vpri[i]}, `
                }
                resultado += "]<br>El vector con los promedios de pares es: ["
                for (const i in vpar){
                    resultado += `${vpar[i]}, `
                }
                resultado += "]"
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
        $(".231").show()
        let form = $("form",".231")
        let matriz1, matriz2, m = 0

        const action = ()=>{
            let row, col, tmp_row, table, tmp_table = "", html, table_head
            row = input_row.val()
            col = input_col.val()
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
                    tmp_row += `<td class="text-muted bg-light"><input class="form-control" type="number"></input></td>`         
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
            html = table + '<div class="form-group"><button type="submit" class="btn btn-primary form-control">Continuar</button><br></div>'
            form.html(html)
        }
        input_row.keyup(action)
        input_col.keyup(action)
        
        form.submit((e)=>{
            e.preventDefault()
            let tbody = $("tbody", form)
            let rows = $("tr", tbody)
            let cell, cols, inputs_row
            let matriz_tmp = []
            for (const i of rows){
                cols = $("td", i)
                inputs_row = []
                for (const j of cols) {
                    inputs_row.push($("input", j).val())
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
                input_row.prop("disable", true)
                input_col.prop("disable", true)
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

    $("#exit_button").click(() => {
        $.confirm({
            theme: 'supervan',
            title: 'Salir',
            content: 'Seguro que quieres salir?',
            buttons: {
                no: () => {},
                si: () => {window.close()},
            },
        })
    })

    hide_all_programs()
    let radio = $('input[type=radio]')
    let form = $("#main_form")
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
    form.submit((e) => {
        e.preventDefault()
        start_program(collect_data())
    })
})