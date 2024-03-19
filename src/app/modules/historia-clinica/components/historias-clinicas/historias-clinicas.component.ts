import { Component, OnInit } from '@angular/core';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { ToastService } from 'src/app/services/toast.service';
import { HistoriaClinica } from '../../model/historia-clinica.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableConfig } from 'src/app/modules/table/models/table-config.model';
import { TableColumn } from 'src/app/modules/table/models/table-column.mode';
import { Mascota } from 'src/app/modules/mascota/model/mascota.model';
import { TableAction } from 'src/app/modules/table/models/table-action.model';
import { TABLE_ACTION } from 'src/app/modules/table/enums/table-action.enum';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-historias-clinicas',
  templateUrl: './historias-clinicas.component.html',
  styleUrl: './historias-clinicas.component.css'
})
export class HistoriasClinicasComponent implements OnInit{

  dialog = false
  tituloDialog !: string
  btnGuardar !: boolean
  btnActualizar !: boolean

  historiasClinicas: HistoriaClinica[] = []
  mascotas:Mascota[] = []
  titleTable:string = "Lista Historias Clinicas"
  tableColumns: TableColumn[] = []
  filterField: string[] = []
  tableConfig!: TableConfig

  historiaClinicaForm:FormGroup = new FormGroup({})

  constructor
    (
      private historiaService : HistoriaClinicaService,
      private fb : FormBuilder,
      private confirmationService: ConfirmationService,
      private toastService : ToastService,
    )
    {
      this.formBuilder()
    }

    ngOnInit(): void {
      this.obtenerHistoriasClinicas()
      this.obtenerMascotas()
      this.configTable()
    }

    private formBuilder(historiaClinica?: HistoriaClinica) {
      this.historiaClinicaForm = this.fb.group({
        id:null,
        fechaCreacion: [ null, [ Validators.required ] ],
        mascotaId: [ null, [ Validators.required ] ]
      })
  
      this.historiaClinicaForm.patchValue(historiaClinica!)
    }
  
    private configTable(){
      this.tableColumns = [
        { header: 'Fecha Creación', field: 'fechaCreacion', dataType:'date', formatt:'dd/MM/yyyy' },
        { header: 'Mascota', field: 'mascota.nombre', dataType: 'object' }
      ]
  
      this.filterField = ['fechaCreacion']
  
      this.tableConfig = {
        showActions: true,
        showActionsConfig: {
          editar: true,
          eliminar: true,
          crear: true
        }
      }
    }
  
    private obtenerHistoriasClinicas() {
      this.historiaService.obtener().subscribe(
        {
          next: (historiasClinicas:HistoriaClinica[]) => {
            this.historiasClinicas = historiasClinicas
          }
        }
      )
    }

    private obtenerMascotas(){
      this.historiaService.obtenerMascotas().subscribe(
        {
          next: (mascotas:Mascota[]) => {
            this.mascotas = mascotas
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
        this.verMascota(tableAction.row.usuario)
      }
    }

    private nuevo(){
      this.dialog = true
      this.tituloDialog = 'Crear Historia Clinica'
      this.btnGuardar = true
      this.btnActualizar = false
      this.formBuilder()
    }

    private editar(historiaClinica:HistoriaClinica){
      this.dialog = true
      this.tituloDialog = 'Editar Historia Clinica'
      this.btnGuardar = false
      this.btnActualizar = true
      historiaClinica.fechaCreacion = new Date(historiaClinica.fechaCreacion);
      this.formBuilder(historiaClinica)

    }

    private verMascota(mascota:Mascota){

    }

    validarCampo(campo: string) {
      return this.historiaClinicaForm.get(campo)?.invalid && this.historiaClinicaForm.get(campo)?.touched && this.historiaClinicaForm.get(campo)?.dirty
    }
  
    private campoInvalid(campo: string) {
      return this.historiaClinicaForm.get(campo)?.invalid;
    }
  
    private toastCampoInvalido(): void {
      const campos = Object.keys(this.historiaClinicaForm.controls)
  
      let campoInvalido = false
      campos.forEach((campo) => {
        if (this.campoInvalid(campo)) campoInvalido = true
      });
  
      if (campoInvalido) this.toastService.showError('Hay campos inválidos', 'Por favor valide todos los campos.')
  
      Object.values(this.historiaClinicaForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
    }
  
    crear() {
      if(this.historiaClinicaForm.invalid){
        this.toastCampoInvalido()
        return
      }
  
      this.historiaService.registrar(this.historiaClinicaForm.value).subscribe({
        next: (historiaClinica:HistoriaClinica) => {
          this.historiasClinicas.push(historiaClinica)
          this.toastService.showSuccess('Guardado', `Se ha guardado con exito.`)
          this.dialog = false
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  
    actualizar() {
      if(this.historiaClinicaForm.invalid){
        this.toastCampoInvalido()
        return
      }
  
      this.historiaService.actualizar(this.historiaClinicaForm.value).subscribe({
        next: (historiaClinica:HistoriaClinica) => {
          const historiasClinicas = this.historiasClinicas.filter((historia: HistoriaClinica) => historia.id !== historiaClinica.id)
          this.historiasClinicas = historiasClinicas.concat(historiaClinica)
          console.log(this.historiasClinicas)
          this.toastService.showSuccess('Actualizado', `Actualizado con exito.`)
          this.dialog = false
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  
    private eliminar(historiaClinica:HistoriaClinica){
      this.confirmationService.confirm({
        message: `Estas seguro de eliminarlo`,
        header: 'Confirmación',
        accept: () => {
          this.historiaService.eliminar(historiaClinica.id).subscribe({
            next: () => {
              const historiasClinicas = this.historiasClinicas.filter((historia:HistoriaClinica) => historia.id !== historiaClinica.id)
              this.historiasClinicas = historiasClinicas
              this.toastService.showSuccess('Eliminado', `Ha sido eliminado con exito.`)
              this.dialog = false
            }
          })
        }
      })
    }
  
    hideDialog(){
      this.dialog = false
    }
}
