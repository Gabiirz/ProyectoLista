import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComentarioService } from '../../../comentarioServicio/comentario.service';
import { Comentario } from '../../../Interfaz/comentario';  // Ajusta la ruta según corresponda

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() taskId!: number;
  @Input() initialComment: Comentario | null = null;
  @Output() commentChanged = new EventEmitter<Comentario | null>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      texto: [this.initialComment ? this.initialComment.texto : '', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitComment(): void {
    if (this.form.invalid) return;
    const formValue = this.form.value;
    const commentData: any = {
      texto: formValue.texto,
      idtarea: this.taskId,
      password: formValue.password
    };
    if (this.initialComment && this.initialComment.id) {
      // Actualizar comentario
      commentData.id = this.initialComment.id;
      this.comentarioService.updateComentario(commentData).subscribe({
        next: (res: Comentario) => {
          this.initialComment = res;
          this.commentChanged.emit(res);
          this.form.patchValue({ password: '' });
        },
        error: (err) => {
          console.error('Error updating comment', err);
          alert('Error updating comment');
        }
      });
    } else {
      // Insertar nuevo comentario
      this.comentarioService.insertComentario(commentData).subscribe({
        next: (res: Comentario) => {
          this.initialComment = res;
          this.commentChanged.emit(res);
          this.form.patchValue({ password: '' });
        },
        error: (err) => {
          console.error('Error inserting comment', err);
          alert('Error inserting comment');
        }
      });
    }
  }

  deleteComment(): void {
    if (this.initialComment && this.initialComment.id) {
      this.comentarioService.deleteComentario(this.initialComment.id).subscribe({
        next: () => {
          this.initialComment = null;
          this.commentChanged.emit(null);
          this.form.reset();
        },
        error: (err) => {
          console.error('Error deleting comment', err);
          alert('Error deleting comment');
        }
      });
    }
  }
}

