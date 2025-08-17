import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  rating: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ nullable: true })
  dates: string;

  @Column({ nullable: true })
  type: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  technologies: string[];

  @Column('simple-json', { nullable: true })
  details: {
    client: string;
    duration: string;
    role: string;
    [key: string]: any;
  };

  @Column('simple-json', { nullable: true })
  requirements: {
    cpu?: string;
    ram?: string;
    storage?: string;
    os?: string;
  };

  @Column('simple-json', { nullable: true })
  media: {
    website?: string;
    twitter?: string;
    facebook?: string;
    discord?: string;
    telegram?: string;
    github?: string;
    youtube?: string;
    email?: string;
  };

  @Column('bytea')
  image: Buffer;

  @Column()
  imageType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 