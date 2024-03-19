import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../model/usuario.model';
import { TableConfig } from 'src/app/modules/table/models/table-config.model';
import { TableColumn } from 'src/app/modules/table/models/table-column.mode';
import { TableAction } from 'src/app/modules/table/models/table-action.model';
import { TABLE_ACTION } from 'src/app/modules/table/enums/table-action.enum';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  dialog = false
  tituloDialog !: string
  btnGuardar !: boolean
  btnActualizar !: boolean

  usuarios: Usuario[] = []
  titleTable:string = "Lista de Usuarios"
  tableColumns: TableColumn[] = []
  filterField: string[] = []
  tableConfig!: TableConfig

  usuariosForm: FormGroup = new FormGroup({})
  tipoDocumento = [{ nombre: 'Cedula Ciudadania', value: 'CC' }, { nombre: 'Tarjeta Identidad', value: 'TI' }, { nombre: 'PasaPorte', value: 'PP' }]
  sexo = [{ label: 'Hombre' }, { label: 'Mujer' }, { label: 'Otro' }]
  estado = [{ label: 'Activo' }, { label: 'Inactivo' }]

  constructor
    (
      private usuarioService: UsuarioService,
      private confirmationService: ConfirmationService,
      private fb: FormBuilder,
      private toastService : ToastService
    )
    {
      this.formBuilder()
    }

  ngOnInit(): void {
    this.obtenerUsuarios()
    this.configTable()
  }

  private formBuilder(usuario?: Usuario) {
    this.usuariosForm = this.fb.group({
      id:null,
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      tipoDocumento: [null, [Validators.required]],
      documentoIdentificacion: [null, [Validators.required]],
      estado: ['Activo', [Validators.required]],
      sexo: [null, [Validators.required]]
    })

    this.usuariosForm.patchValue(usuario!)
  }

  private configTable(){
    this.tableColumns = [
      { header: 'Nombres', field: 'nombres' },
      { header: 'Apellidos', field: 'apellidos' },
      { header: 'Tipo de Documento', field: 'tipoDocumento' },
      { header: 'Numero de Documento', field: 'documentoIdentificacion' },
      { header: 'Estado', field: 'estado' },
      { header: 'Sexo', field: 'sexo' },
    ]

    this.filterField = ['nombres', 'apellidos', 'documentoIdentificacion']

    this.tableConfig = {
      showActions: true,
      showActionsConfig: {
        editar: true,
        eliminar: true,
        crear: true
      }
    }
  }

  private obtenerUsuarios() {
    this.usuarioService.obtener().subscribe({
      next: (datos) => {
        this.usuarios = datos
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
  }

  private nuevo() {
    this.dialog = true
    this.tituloDialog = 'Crear Usuario'
    this.btnGuardar = true
    this.btnActualizar = false
    this.formBuilder()
  }

  private editar(usuario: Usuario) {
    this.dialog = true
    this.tituloDialog = 'Editar Usuario'
    this.btnActualizar = true
    this.btnGuardar = false
    this.formBuilder(usuario)
  }

  validarCampo(campo: string) {
    return this.usuariosForm.get(campo)?.invalid && this.usuariosForm.get(campo)?.touched && this.usuariosForm.get(campo)?.dirty
  }

  private campoInvalid(campo: string) {
    return this.usuariosForm.get(campo)?.invalid;
  }

  private toastCampoInvalido(): void {
    const campos = Object.keys(this.usuariosForm.controls)

    let campoInvalido = false
    campos.forEach((campo) => {
      if (this.campoInvalid(campo)) campoInvalido = true
    });

    if (campoInvalido) this.toastService.showError('Hay campos inválidos', 'Por favor valide todos los campos.')

    Object.values(this.usuariosForm.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  crear() {
    if(this.usuariosForm.invalid){
      this.toastCampoInvalido()
      return
    }

    this.usuarioService.registrar(this.usuariosForm.value).subscribe({
      next: (usuario:Usuario) => {
        this.usuarios.push(usuario)
        this.toastService.showSuccess('Guardado', `<strong>${usuario.nombres} ${usuario.apellidos}</strong> se ha guardado con exito.`)
        this.dialog = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  actualizar() {
    this.usuarioService.actualizar(this.usuariosForm.value).subscribe({
      next: (usuario:Usuario) => {
        const usuarios = this.usuarios.filter((user: Usuario) => user.id !== usuario.id)
        this.usuarios = usuarios.concat(usuario)
        this.toastService.showSuccess('Actualizado', `<strong>${usuario.nombres} ${usuario.apellidos}</strong> actualizado con exito.`)
        this.dialog = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  eliminar(usuario: Usuario) {
    this.confirmationService.confirm({
      message: `Estas seguro de eliminar a <strong>${usuario.nombres} ${usuario.apellidos}</strong>`,
      header: 'Confirmación',
      accept: () => {
        this.usuarioService.eliminar(usuario.id).subscribe({
          next: () => {
            const usuarios = this.usuarios.filter((user:Usuario) => user.id !== usuario.id)
            this.usuarios = usuarios
            this.toastService.showSuccess('Eliminado', `<strong>${usuario.nombres} ${usuario.apellidos}</strong> ha sido eliminado con exito.`)
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
