
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Image, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface AdminHeaderProps {
  title: string;
  description: string;
  onTestSMS?: () => Promise<void>;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  title, 
  description, 
  onTestSMS 
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
    
    toast('Disconnessione Effettuata', {
      description: 'Sei stato disconnesso dall\'area amministrativa.'
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-serif mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 md:mt-0 space-x-2 flex">
        <Button variant="outline" onClick={() => navigate('/admin/gallery')}>
          <Image className="mr-2 h-4 w-4" />
          Gestione Galleria
        </Button>
        {onTestSMS && (
          <Button variant="outline" onClick={onTestSMS}>
            <Mail className="mr-2 h-4 w-4" />
            Testa SMS
          </Button>
        )}
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Esci
        </Button>
      </div>
    </div>
  );
};
