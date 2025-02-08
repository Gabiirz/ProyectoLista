import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../Interfaz/usuario';
import { UsuarioService } from '../../../usuarioServicio/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioForm!: FormGroup;
  usuarios: Usuario[] = [];
  selectedUsuario?: Usuario;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required]
    });
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  addUsuario(): void {
    if (this.usuarioForm.valid) {
      const newUsuario: Usuario = {
        idusuario: 0, // Se ignora, la BD asigna el ID
        ...this.usuarioForm.value
      };
      this.usuarioService.insertUsuario(newUsuario).subscribe({
        next: (res: string) => {
          console.log('Usuario agregado:', res);
          this.getUsuarios();
          this.usuarioForm.reset();
        },
        error: (err) => {
          console.error('Error al agregar usuario:', err);
        }
      });
    } else {
      alert('Completa el formulario correctamente');
    }
  }

  updateUsuario(): void {
    if (this.usuarioForm.valid && this.selectedUsuario) {
      const updatedUsuario: Usuario = {
        ...this.selectedUsuario,
        ...this.usuarioForm.value
      };
      this.usuarioService.updateUsuario(updatedUsuario).subscribe({
        next: (res: string) => {
          console.log('Usuario actualizado:', res);
          this.getUsuarios();
          this.usuarioForm.reset();
          this.selectedUsuario = undefined;
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
        }
      });
    } else {
      alert('Completa el formulario correctamente');
    }
  }

  deleteUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: (res: string) => {
        console.log('Usuario eliminado:', res);
        this.getUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }

  selectUsuario(usuario: Usuario): void {
    this.selectedUsuario = usuario;
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      contrasena: usuario.contrasena,
      rol: usuario.rol
    });
  }

  // Método para cancelar la edición y reiniciar el formulario
  cancelUpdate(): void {
    this.selectedUsuario = undefined;
    this.usuarioForm.reset();
  }
}



