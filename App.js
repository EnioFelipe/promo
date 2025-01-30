import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Coleta from "./src/screens/Coleta";
import Agradecimento from "./src/screens/Agradecimento";
import NovaConta from "./src/screens/NovaConta";
import NovaPesquisa from "./src/screens/NovaPesquisa";
import AcaoPesquisa from "./src/screens/AcaoPesquisa";
import RecuperarSenha from "./src/screens/RecuperarSenha";
import Home from "./src/screens/Home";
import Drawer from "./src/screens/Drawer";
import ModPesquisas from "./src/screens/ModPesquisas";
import Relatorio from "./src/screens/Relatorio";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";




const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Nova Pesquisa"
            component={NovaPesquisa}
            options={{
              headerStyle: { backgroundColor: '#2B1D62' },
              headerTintColor: '#573FBA',
              headerTitleStyle: { color: '#FFFFFF', fontFamily: 'AveriaLivre-Regular' },
            }}
          />
          <Stack.Screen
            name="Ações"
            component={AcaoPesquisa}
            options={{
              headerStyle: { backgroundColor: '#2B1D62' },
              headerTintColor: '#573FBA',
              headerTitleStyle: { color: '#FFFFFF', fontFamily: 'AveriaLivre-Regular', fontSize: 33, },
            }}
          />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen
            name="NovaConta"
            component={NovaConta}
            options={{
              headerTintColor: '#573FBA',
              headerTitle: 'Nova Conta',
              headerStyle: { backgroundColor: '#2B1D62' },
              headerTitleStyle: { fontFamily: 'AveriaLibre-Regular', fontSize: 33, color: '#FFFFFF' },
            }}
          />
          <Stack.Screen name="Coleta" component={Coleta} options={{ headerShown: false }} />
          <Stack.Screen name="Agradecimento" component={Agradecimento} options={{ headerShown: false }} />
          <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen
            name="RecuperarSenha"
            component={RecuperarSenha}
            options={{
              headerTintColor: '#573FBA',
              headerTitle: 'Recuperar Senha',
              headerStyle: { backgroundColor: '#2B1D62' },
              headerTitleStyle: { fontFamily: 'AveriaLibre-Regular', fontSize: 33, color: '#FFFFFF' },
            }}
          />
          <Stack.Screen name="ModPesquisas" component={ModPesquisas} options={{
              headerTintColor: '#573FBA',
              headerTitle: 'Modificar Pesquisa',
              headerStyle: { backgroundColor: '#2B1D62' },
              headerTitleStyle: { fontFamily: 'AveriaLibre-Regular', fontSize: 33, color: '#FFFFFF' },
            }} />
          <Stack.Screen name="Relatorio" component={Relatorio} options={{
              headerTintColor: '#573FBA',
              headerTitle: 'Relatorio',
              headerStyle: { backgroundColor: '#2B1D62' },
              headerTitleStyle: { fontFamily: 'AveriaLibre-Regular', fontSize: 33, color: '#FFFFFF' },
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
