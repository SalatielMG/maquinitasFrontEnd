import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

export class BusquedaCajasCerradas {
    isSearch: boolean;
    dataFiltros: FormGroup;
    isCollapse: boolean;
    constructor(
        isSearch = false,
        dataFiltrosBusquedaCajasCerradas = new DataFiltros(),
        isCollapse = false
    ){
        this.isSearch = isSearch;
        this.dataFiltros = dataFiltrosBusquedaCajasCerradas;
        this.isCollapse = isCollapse;
    }
}
export class DataFiltros extends FormGroup{
    constructor(
        formBuilder = new FormBuilder()
    ) {
        super({}
        );
        this.addControl("caja",
            new FormControl('',
                {
                    validators: [Validators.required]
                }));
        this.addControl("fechaAbierto",
            new FormControl('',
                {
                    validators: [Validators.required]
                }));
        this.addControl("rangoFechaAbierto", formBuilder.array([
            formBuilder.group({
                fechaInicial: ['', Validators.required],
                fechaFinal: ['', Validators.required],
            }),
        ]));
        this.addControl("fechaCorte",
            new FormControl('',
                {
                    validators: [Validators.required]
                }));
        this.addControl("rangoFechaCorte", formBuilder.array([
            formBuilder.group({
                fechaInicial: ['', Validators.required],
                fechaFinal: ['', Validators.required],
            }),
        ]));
        this.addControl("monto1",
            new FormControl('',
                {
                    validators: [Validators.required]
                }));
        this.addControl("monto5",
            new FormControl('',
                {
                    validators: [Validators.required]
                }));
    }
}
