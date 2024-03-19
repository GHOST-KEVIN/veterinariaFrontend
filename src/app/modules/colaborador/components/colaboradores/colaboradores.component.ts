import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador } from '../../model/colaborador.model';
import { TableColumn } from 'src/app/modules/table/models/table-column.mode';
import { TableConfig } from 'src/app/modules/table/models/table-config.model';
import { TableAction } from 'src/app/modules/table/models/table-action.model';
import { TABLE_ACTION } from 'src/app/modules/table/enums/table-action.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css'
})
export class ColaboradoresComponent implements OnInit{

  dialog = false
  tituloDialog !: string
  btnGuardar !: boolean
  btnActualizar !: boolean

  colaboradorForm:FormGroup = new FormGroup({})
  tipoDocumento = [{ nombre: 'Cedula Ciudadania', value: 'CC' }, { nombre: 'Tarjeta Identidad', value: 'TI' }, { nombre: 'PasaPorte', value: 'PP' }]

  colaboradores:Colaborador[] = []
  titleTable:string = "Lista de Colaboradores"
  tableColumns:TableColumn[] = []
  filterField:string[] = []
  tableConfig!: TableConfig

  constructor
    (
      private colaboradorService : ColaboradorService,
      private fb : FormBuilder,
      private toastService : ToastService
    )
    {
      this.formBuilder()
    }

  ngOnInit(): void {
    this.obtenerColaboradores()
    this.configTable()
  }

  private formBuilder(colaborador?:Colaborador){
    this.colaboradorForm = this.fb.group({
      id:null,
      nombres: [null, [ Validators.required, Validators.maxLength(20) ]],
      apellidos: [ null, [ Validators.required, Validators.maxLength(20) ]],
      tipoDocumento: [ null, [ Validators.required, Validators.maxLength(2) ]],
      documentoIdentificacion: [ null, [ Validators.required, Validators.maxLength(15) ]],
      cargo: [ null, [ Validators.required, Validators.maxLength(30) ]],
      especialidad: [ null, [ Validators.required, Validators.maxLength(30) ]]
    })

    this.colaboradorForm.patchValue(colaborador!)
  }
  private configTable(){
    this.tableColumns = [
      { header: 'Nombres', field: 'nombres' },
      { header: 'Apellidos', field: 'apellidos' },
      { header: 'Tipo de Documento', field: 'tipoDocumento' },
      { header: 'Numero de Documento', field: 'documentoIdentificacion' },
      { header: 'Cargo', field: 'cargo' },
      { header: 'Especialidad', field: 'especialidad' },
    ]

    this.filterField = ['nombres', 'apellidos', 'documentoIdentificacion']

    this.tableConfig = {
      showActions: true,
      showActionsConfig: {
        editar: true,
        crear: true
      }
    }
  }

  private obtenerColaboradores(){
    this.colaboradorService.obtener().subscribe({
      next: (colaboradores:Colaborador[]) => {
        this.colaboradores = colaboradores
      }
    })
  }

  onTableAction(tableAction: TableAction) {
    if (tableAction.action === TABLE_ACTION.CREAR) {
      this.nuevo()
    }
    else if (tableAction.action === TABLE_ACTION.EDITAR) {
      this.editar(tableAction.row)
    }
  }

  private nuevo(){
    this.tituloDialog = 'Crear Colaborador'
    this.dialog = true
    this.btnGuardar = true
    this.btnActualizar = false
    this.formBuilder()
  }

  private editar(colaborador:Colaborador){
    this.dialog = true
    this.tituloDialog = 'Editar Usuario'
    this.btnActualizar = true
    this.btnGuardar = false
    this.formBuilder(colaborador)
  }

  validarCampo(campo: string) {
    return this.colaboradorForm.get(campo)?.invalid && this.colaboradorForm.get(campo)?.touched && this.colaboradorForm.get(campo)?.dirty
  }

  private campoInvalid(campo: string) {
    return this.colaboradorForm.get(campo)?.invalid;
  }

  private toastCampoInvalido(): void {
    const campos = Object.keys(this.colaboradorForm.controls)

    let campoInvalido = false
    campos.forEach((campo) => {
      if (this.campoInvalid(campo)) campoInvalido = true
    });

    if (campoInvalido) this.toastService.showError('Hay campos inválidos', 'Por favor valide todos los campos.')

    Object.values(this.colaboradorForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  crear() {
    if(this.colaboradorForm.invalid){
      this.toastCampoInvalido()
      return
    }

    this.colaboradorService.registrar(this.colaboradorForm.value).subscribe({
      next: (colaborador:Colaborador) => {
        this.colaboradores.push(colaborador)
        this.toastService.showSuccess('Guardado', `<strong>${colaborador.nombres} ${colaborador.apellidos}</strong> se ha guardado con exito.`)
        this.colaboradorForm.reset()
        this.dialog = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  actualizar() {
    this.colaboradorService.actualizar(this.colaboradorForm.value).subscribe({
      next: (colaborador:Colaborador) => {
        const colaboradores = this.colaboradores.filter((user: Colaborador) => user.id !== colaborador.id)
        this.colaboradores = colaboradores.concat(colaborador)
        this.toastService.showSuccess('Actualizado', `<strong>${colaborador.nombres} ${colaborador.apellidos}</strong> actualizado con exito.`)
        this.colaboradorForm.reset()
        this.dialog = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  hideDialog() {
    this.dialog = false
  }
}
