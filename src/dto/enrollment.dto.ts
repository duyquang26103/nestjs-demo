import { IsDate } from 'class-validator';
import { Expose } from 'class-transformer'; // Import the Expose decorator

export class EnrollmentDto {
  @Expose() // Expose this property
  id: number;

  @Expose() // Expose this property
  @IsDate()
  enrollmentDate: Date;

  // You can choose to expose or hide other properties as needed
}