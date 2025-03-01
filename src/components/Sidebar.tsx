import { FC } from 'react';
import { Home, Users, Clipboard, UserPlus, Shield, Activity, LogOut, User } from 'lucide-react';

interface SidebarProps {
    user: {
        username: string;
        type: 'doctor' | 'admin' | 'patient' | 'guardian';
    } | null;
    logout: () => void;
}

const Sidebar: FC<SidebarProps> = ({ user, logout }) => {
    
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4 border-b">
                <h1 className="text-xl font-semibold text-blue-600">HealthCare Portal</h1>
            </div>
            <div className="p-4">
                <div className="flex items-center space-x-2 mb-6">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium">{user?.username}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.type}</p>
                    </div>
                </div>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                <Home className="h-5 w-5 mr-3" />
                                Dashboard
                            </a>
                        </li>
                        
                        {user?.type === 'doctor' && (
                            <>
                                <li>
                                    <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                        <Users className="h-5 w-5 mr-3" />
                                        My Patients
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                        <Clipboard className="h-5 w-5 mr-3" />
                                        Prescriptions
                                    </a>
                                </li>
                            </>
                        )}
                        
                        {/* Rest of the conditional renders remain the same */}
                        {user?.type === 'admin' && (
                            <>
                                <li>
                                    <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                        <Users className="h-5 w-5 mr-3" />
                                        All Patients
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                        <UserPlus className="h-5 w-5 mr-3" />
                                        Doctors
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                        <Shield className="h-5 w-5 mr-3" />
                                        Guardians
                                    </a>
                                </li>
                            </>
                        )}

                        {user?.type === 'patient' && (
                            <>
                                <li>
                                    <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                        <Activity className="h-5 w-5 mr-3" />
                                        My Symptoms
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                        <Clipboard className="h-5 w-5 mr-3" />
                                        Prescriptions
                                    </a>
                                </li>
                            </>
                        )}

                        {user?.type === 'guardian' && (
                            <li>
                                <a href="#" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                    <Users className="h-5 w-5 mr-3" />
                                    My Patients
                                </a>
                            </li>
                        )}
                        
                        <li>
                            <button 
                                onClick={logout}
                                className="flex items-center p-2 rounded-md hover:bg-red-50 text-gray-700 hover:text-red-600 w-full text-left"
                            >
                                <LogOut className="h-5 w-5 mr-3" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;