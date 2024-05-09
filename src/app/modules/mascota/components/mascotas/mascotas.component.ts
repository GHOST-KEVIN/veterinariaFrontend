import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Mascota } from '../../model/mascota.model';
import { MascotaService } from '../../services/mascota.service';
import { TableColumn } from 'src/app/modules/table/models/table-column.mode';
import { TableConfig } from 'src/app/modules/table/models/table-config.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableAction } from 'src/app/modules/table/models/table-action.model';
import { TABLE_ACTION } from 'src/app/modules/table/enums/table-action.enum';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from 'src/app/modules/usuario/model/usuario.model';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent implements OnInit {

  dialog = false
  tituloDialog !: string
  btnGuardar !: boolean
  btnActualizar !: boolean

  mascotas: Mascota[] = []
  usuarios: Usuario[] = []
  titleTable: string = "Lista de Mascotas"
  btnObservar: string = "Datos Del Dueño"
  tableColumns: TableColumn[] = []
  filterField: string[] = []
  tableConfig!: TableConfig

  mascotaForm: FormGroup = new FormGroup({})
  sexo = [{ label: 'Macho' }, { label: 'Hembra' }]
  usuario!: Usuario
  observar !: boolean
  tituloDialogObservar !: string

  constructor
    (
      private mascotaService: MascotaService,
      private fb: FormBuilder,
      private confirmationService: ConfirmationService,
      private toastService: ToastService,
    ) {
    // this.formBuilder()
  }

  ngOnInit(): void {
    this.obtenerMascotas()
    this.obtenerUsuarios()
    this.configTable()
  }

  private formBuilder(mascota?:Mascota) {

    this.mascotaForm = this.fb.group({
      id: null,
      nombre: [null, [Validators.required, Validators.maxLength(15)]],
      raza: [null, [Validators.required, Validators.maxLength(20)]],
      sexo: [ null, [Validators.required, Validators.maxLength(6)]],
      usuarioId: [ null, [Validators.required]]
    });

    this.mascotaForm.patchValue(mascota!);
  }

  private configTable() {
    this.tableColumns = [
      { header: 'Nombre', field: 'nombre' },
      { header: 'Raza', field: 'raza' },
      { header: 'Sexo', field: 'sexo' },
      { header: 'Dueño', field: 'usuario.nombres', dataType: 'object' }
    ]

    this.tableConfig = {
      showActions: true,
      showActionsConfig: {
        editar: true,
        eliminar: true,
        crear: true,
        observar: true
      }
    }

    this.filterField = ['nombre', 'raza']
  }

  private obtenerMascotas() {
    this.mascotaService.obtener().subscribe({
      next: (mascotas: Mascota[]) => {
        this.mascotas = mascotas
      }
    })
  }

  private obtenerUsuarios() {
    this.mascotaService.obtenerUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios
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
    else if (tableAction.action === TABLE_ACTION.ELIMINAR) {
      this.eliminar(tableAction.row)
    }
    else if (tableAction.action === TABLE_ACTION.OBSERVAR) {
      this.verDueño(tableAction.row.usuario)
    }
  }

  private nuevo(){
    this.dialog = true
    this.tituloDialog = 'Crear Mascota'
    this.btnGuardar = true
    this.btnActualizar = false
    this.formBuilder()
  }

  private editar(mascota: Mascota) {
    this.dialog = true
    this.tituloDialog = 'Editar Usuario'
    this.btnActualizar = true
    this.btnGuardar = false
    this.formBuilder(mascota)
  }

  private verDueño(usuario: Usuario) {
    this.usuario = usuario
    this.tituloDialogObservar = 'Datos del Dueño'
    this.observar = true
  }

  validarCampo(campo: string) {
    return this.mascotaForm.get(campo)?.invalid && this.mascotaForm.get(campo)?.touched && this.mascotaForm.get(campo)?.dirty
  }

  private campoInvalid(campo: string) {
    return this.mascotaForm.get(campo)?.invalid;
  }

  private toastCampoInvalido(): void {
    const campos = Object.keys(this.mascotaForm.controls)

    let campoInvalido = false
    campos.forEach((campo) => {
      if (this.campoInvalid(campo)) campoInvalido = true
    });

    if (campoInvalido) this.toastService.showError('Hay campos inválidos', 'Por favor valide todos los campos.')

    Object.values(this.mascotaForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  crear() {
    if(this.mascotaForm.invalid){
      this.toastCampoInvalido()
      return
    }

    this.mascotaService.registrar(this.mascotaForm.value).subscribe({
      next: (mascota:Mascota) => {
        this.mascotas.push(mascota)
        this.toastService.showSuccess('Guardado', `<strong>${mascota.nombre}</strong> se ha guardado con exito.`)
        this.dialog = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  actualizar() {
    if (this.mascotaForm.invalid) {
      this.toastCampoInvalido()
      return
    }

    this.mascotaService.actualizar(this.mascotaForm.value).subscribe({
      next: (mascota: Mascota) => {
        const mascotas = this.mascotas.filter((animal: Mascota) => animal.id !== mascota.id)
        this.mascotas = mascotas.concat(mascota)
        this.toastService.showSuccess('Actualizado', `<strong>${mascota.nombre}</strong> actualizado con exito.`)
        this.dialog = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  private eliminar(mascota: Mascota) {
    this.confirmationService.confirm({
      message: `Estas seguro de eliminar a <strong>${mascota.nombre}</strong>`,
      header: 'Confirmación',
      accept: () => {
        this.mascotaService.eliminar(mascota.id).subscribe({
          next: () => {
            const mascotas = this.mascotas.filter((animal: Mascota) => animal.id !== mascota.id)
            this.mascotas = mascotas
            this.toastService.showSuccess('Eliminado', `<strong>${mascota.nombre}</strong> ha sido eliminado con exito.`)
            this.dialog = false
          }
        })
      }
    })
  }

  hideDialog() {
    this.dialog = false
  }
}
