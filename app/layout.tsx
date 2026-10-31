import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Clicker Save Forge', description: 'Edit Clicker Heroes Unity saves.' };
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
