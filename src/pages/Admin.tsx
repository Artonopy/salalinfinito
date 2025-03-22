
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication for demo purposes
    // In a real app, you would use a proper authentication system
    if (username === 'admin' && password === 'infinito123') {
      // Store authentication state
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      // Redirect to admin dashboard
      navigate('/admin/gallery');
      
      toast({
        title: 'Accesso Effettuato',
        description: 'Benvenuto al pannello di amministrazione.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Errore di Accesso',
        description: 'Nome utente o password non validi.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Accedi al pannello di amministrazione
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="username"
                  placeholder="Nome Utente"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Accedi</Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            Per accedere all'area amministrativa, contattare il gestore del sito.
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
