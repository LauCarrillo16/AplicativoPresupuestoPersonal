document.addEventListener("DOMContentLoaded", function () {
    cargarApp();
});

const ingresos = [
    new Ingreso('Salario', 1500000),
];

const egresos = [
    new Egreso('Renta departamento', 400000),
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-CO', { style: 'percent', minimumFractionDigits: 2 });
}


const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}


const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista_ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar_btn'>
            <ion-icon name="trash-outline"
            onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </buttton>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista_egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresosTotales = totalIngresos();
    let porcentaje = ((egresosTotales / egreso.valor) * 10).toFixed(2);
    let egresoHTML = `
    <div class="elemento">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha">
        <div class="elemento_valor">+ ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje"> ${porcentaje}%</div> 
        <div class="elemento_eliminar">
            <button class='elemento_eliminar_btn'>
                <ion-icon name="trash-outline"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </buttton> 
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}


let agregarDato = () => {
    let tipo = document.getElementById('tipo').value
    let descripcion = document.getElementById('descripcion').value
    let valor = document.getElementById('Valor').value
    if (descripcion !== '' & valor !== '') {
        console.log(tipo);
        if (tipo === 'ingreso') {
            ingresos.push(new Ingreso(descripcion, +valor));
            cargarCabecero();
            cargarIngresos();
        }
        else if (tipo === 'egreso') {
            egresos.push(new Egreso(descripcion, +valor));
            cargarCabecero();
            cargarEgresos();
        }
    }
}
