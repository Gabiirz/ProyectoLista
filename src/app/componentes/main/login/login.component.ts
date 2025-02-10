import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  
  // Roles permitidos
  roles: string[] = ['Admin', 'User'];
  
  // Variables para alternar visibilidad de contraseñas
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      rol: ['', Validators.required]
    });
    this.getUsuarios();
  }

  // Getter para verificar si las contraseñas coinciden
  get passwordsMatch(): boolean {
    const pass = this.usuarioForm.get('contrasena')?.value;
    const confirmPass = this.usuarioForm.get('confirmarContrasena')?.value;
    return pass && confirmPass && pass === confirmPass;
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
    if (!this.usuarioForm.valid) {
      alert('Completa el formulario correctamente');
      return;
    }
    if (!this.passwordsMatch) {
      alert('Las contraseñas no coinciden');
      return;
    }
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
  }

  updateUsuario(): void {
    if (!this.usuarioForm.valid || !this.selectedUsuario) {
      alert('Completa el formulario correctamente');
      return;
    }
    if (!this.passwordsMatch) {
      alert('Las contraseñas no coinciden');
      return;
    }
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
      confirmarContrasena: usuario.contrasena,
      rol: usuario.rol
    });
  }

  // Alterna la visibilidad de la contraseña
  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Método para cancelar la edición y reiniciar el formulario
  cancelUpdate(): void {
    this.selectedUsuario = undefined;
    this.usuarioForm.reset();
  }
}




