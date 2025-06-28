
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Communauté Spirituelle
          </h1>
          <p className="text-slate-600">
            Bienvenue dans votre espace communautaire
          </p>
        </div>

        <Card className="bg-white border border-slate-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-medium text-slate-900">Connexion</CardTitle>
            <CardDescription className="text-slate-600">
              Connectez-vous pour accéder à votre espace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-white border-slate-300 text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-white border-slate-300 text-slate-900"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-slate-700 mb-2">Comptes de démonstration :</p>
              <div className="space-y-1 text-xs text-slate-600">
                <p><strong>Admin :</strong> admin@communaute.fr</p>
                <p><strong>Permanent :</strong> permanent@communaute.fr</p>
                <p><strong>Membre :</strong> membre@communaute.fr</p>
                <p className="mt-2"><strong>Mot de passe :</strong> password</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
