import { Component, OnInit } from '@angular/core';
import { DetalleHistoriaClinicaService } from '../../services/detalle-historia-clinica.service';
import { ToastService } from 'src/app/services/toast.service';
import { DetalleHistoriaClinica } from '../../model/detalle-historia-clinica.model';
import { TableConfig } from 'src/app/modules/table/models/table-config.model';
import { TableColumn } from 'src/app/modules/table/models/table-column.mode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableAction } from 'src/app/modules/table/models/table-action.model';
import { TABLE_ACTION } from 'src/app/modules/table/enums/table-action.enum';
import { ConfirmationService } from 'primeng/api';
import { HistoriaClinica } from 'src/app/modules/historia-clinica/model/historia-clinica.model';
import { Colaborador } from 'src/app/modules/colaborador/model/colaborador.model';

@Component({
  selector: 'app-detalles-historias-clinicas',
  templateUrl: './detalles-historias-clinicas.component.html',
  styleUrl: './detalles-historias-clinicas.component.css'
})
export class DetallesHistoriasClinicasComponent implements OnInit {

  dialog = false
  tituloDialog !: string
  btnGuardar !: boolean
  btnActualizar !: boolean

  detallesClinicos: DetalleHistoriaClinica[] = []
  titleTable: string = "Lista Detalles Clinicos"
  tableColumns: TableColumn[] = []
  filterField: string[] = []
  tableConfig!: TableConfig

  detallesClinicosForm: FormGroup = new FormGroup({})
  historiasClinicas: HistoriaClinica[] = []
  colaboradores: Colaborador[] = []

  observar !: boolean
  tituloDialogObservar !: string
  colaborador !: Colaborador
  historiaClinica !: HistoriaClinica

  constructor
    (
      private detallesService: DetalleHistoriaClinicaService,
      private toastService: ToastService,
      private fb: FormBuilder,
      private confirmationService: ConfirmationService,
    ) {
    this.formBuilder()
  }

  ngOnInit(): void {
    this.obtenerDetallesClinicos()
    this.configTable()
  }

  private formBuilder(detalleClinico?: DetalleHistoriaClinica) {

    this.detallesClinicosForm = this.fb.group({

      id: null,
      temperatura: [0, [Validators.required, Validators.maxLength(15)]],
      peso: [0, [Validators.required, Validators.maxLength(15)]],
      frecuenciaCardiaca: [null, [Validators.required, Validators.maxLength(7)]],
      frecuenciaRespiratoria: [null, [Validators.required, Validators.maxLength(7)]],
      fechaHora: [null, [Validators.required]],
      alimentacion: [null, [Validators.required, Validators.maxLength(15)]],
      habitad: [null, [Validators.required, Validators.maxLength(15)]],
      observacion: [null, [Validators.required, Validators.maxLength(200)]],
      historiaClinicaId: [null, [Validators.required]],
      colaboradorId: [null, [Validators.required]]
    })

    this.detallesClinicosForm.patchValue(detalleClinico!)
  }

  private configTable() {
    this.tableColumns = [
      { header: 'Temperatura', field: 'temperatura' },
      { header: 'Peso', field: 'peso' },
      { header: 'Frecuencia Cardiaca', field: 'frecuenciaCardiaca' },
      { header: 'Frecuencia Respiratoria', field: 'frecuenciaRespiratoria' },
      { header: 'Fecha Hora', field: 'fechaHora', dataType: 'date', formatt: 'dd/MM/yyyy HH:mm:ss' },
      { header: 'Alimentación', field: 'alimentacion' },
      { header: 'Habitad', field: 'habitad' },
      { header: 'Observación', field: 'observacion' },
    ]

    this.filterField = ['habitad', 'fechaHora', 'temperatura']

    this.tableConfig = {
      showActions: true,
      showActionsConfig: {
        editar: true,
        eliminar: true,
        crear: true,
        observar: true
      }
    }
  }

  private obtenerDetallesClinicos() {
    this.detallesService.obtener().subscribe(
      {
        next: (detallesClinicos: DetalleHistoriaClinica[]) => {
          this.detallesClinicos = detallesClinicos
        }
      }
    )
  }

  onTableAction(tableAction: TableAction) {
    if (tableAction.action === TABLE_ACTION.CREAR) {
      this.nuevo()
    }
    else if (tableAction.action === TABLE_ACTION.EDITAR) {
      this.editar(tableAction.row)
    }
    else if (tableAction.action === TABLE_ACTION.ELIMINAR) {
      this.eliminar(tableAction.row)
    }
    else if(tableAction.action === TABLE_ACTION.OBSERVAR){
      this.verDatos(tableAction.row.colaborador, tableAction.row.historiaClinica)
    }
  }

  private nuevo() {
    this.dialog = true
    this.tituloDialog = 'Crear Detalles Clinicos'
    this.btnGuardar = true
    this.btnActualizar = false
    this.formBuilder()
  }

  private editar(detalleClinico: DetalleHistoriaClinica) {
    this.dialog = true
    this.tituloDialog = 'Editar Detalles Clinicos'
    this.btnActualizar = true
    this.btnGuardar = false
    detalleClinico.fechaHora = new Date(detalleClinico.fechaHora)
    this.obtenerHistoriasClinicas()
    this.obtenerColaboradores()
    this.formBuilder(detalleClinico)
  }

  private verDatos(colaborador:Colaborador, historiaClinica:HistoriaClinica){
    this.colaborador = colaborador
    this.historiaClinica = historiaClinica
    this.tituloDialogObservar = 'Datos'
    this.observar = true
  }

  validarCampo(campo: string) {
    return this.detallesClinicosForm.get(campo)?.invalid && this.detallesClinicosForm.get(campo)?.touched && this.detallesClinicosForm.get(campo)?.dirty
  }

  private campoInvalid(campo: string) {
    return this.detallesClinicosForm.get(campo)?.invalid;
  }

  private toastCampoInvalido(): void {
    const campos = Object.keys(this.detallesClinicosForm.controls)

    let campoInvalido = false
    campos.forEach((campo) => {
      if (this.campoInvalid(campo)) campoInvalido = true
    });

    if (campoInvalido) this.toastService.showError('Hay campos inválidos', 'Por favor valide todos los campos.')

    Object.values(this.detallesClinicosForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  crear() {
    if (this.detallesClinicosForm.invalid) {
      this.toastCampoInvalido()
      return
    }

    this.detallesService.registrar(this.detallesClinicosForm.value).subscribe({
      next: (detalleClinico: DetalleHistoriaClinica) => {
        this.detallesClinicos.push(detalleClinico)
        this.toastService.showSuccess('Guardado', `Se ha guardado con exito.`)
        this.dialog = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  actualizar() {
    this.detallesService.actualizar(this.detallesClinicosForm.value).subscribe({
      next: (detalleClinico: DetalleHistoriaClinica) => {
        const detallesClinicos = this.detallesClinicos.filter((detalle: DetalleHistoriaClinica) => detalle.id !== detalleClinico.id)
        this.detallesClinicos = detallesClinicos.concat(detalleClinico)
        this.toastService.showSuccess('Actualizado', `Actualizado con exito.`)
        this.dialog = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  private eliminar(detalleClinico: DetalleHistoriaClinica) {
    this.confirmationService.confirm({
      message: `Estas seguro de eliminar este detalle clinico.`,
      header: 'Confirmación',
      accept: () => {
        this.detallesService.eliminar(detalleClinico.id).subscribe({
          next: () => {
            const usuarios = this.detallesClinicos.filter((user: DetalleHistoriaClinica) => user.id !== detalleClinico.id)
            this.detallesClinicos = usuarios
            this.toastService.showSuccess('Eliminado', `Se ha aliminado con exito.`)
            this.dialog = false
          }
        })
      }
    })
  }

  obtenerHistoriasClinicas() {
    if (this.historiasClinicas.length === 0) {
      this.detallesService.obtenerHistoriasClinicas().subscribe(
        {
          next: (historiasClinicas: HistoriaClinica[]) => {
            this.historiasClinicas = historiasClinicas
          }
        }
      )
    }
  }

  obtenerColaboradores() {
    if (this.colaboradores.length === 0) {
      this.detallesService.obtenerColaboradores().subscribe(
        {
          next: (colaboradores: Colaborador[]) => {
            this.colaboradores = colaboradores
          }
        }
      )
    }
  }

  hideDialog() {
    this.historiasClinicas = []
    this.colaboradores = []
    this.dialog = false
  }
}
