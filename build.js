import { execSync } from 'child_process';
import { rimraf } from 'rimraf';

async function build() {
  try {
    console.log('Starting build process...');
    
    // Clean dist directory
    console.log('Cleaning dist directory...');
    await rimraf('dist');
    
    // Run TypeScript build
    console.log('Running TypeScript build...');
    execSync('tsc -b', { stdio: 'inherit' });
    
    // Run Vite build
    console.log('Running Vite build...');
    execSync('vite build', { stdio: 'inherit' });
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();