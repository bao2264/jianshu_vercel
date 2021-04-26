import React, { useCallback, useState } from 'react';
import {
  Box,
  Image,
  VStack,
  HStack,
  Center,
  Text,
  Flex,
} from '@chakra-ui/react';

import Login from './Login';
import Register from './Register';

import jsLogo from './jslogo.png';
import jsSlogan from './jsslogan.png';
import qr from './qr.png';

function App() {
  const [currentTab, setCurrentTab] = useState('login');
  const handleChangeTab = useCallback(flag => {
    setCurrentTab(flag);
  }, []);
  var activeStyle = {
    color: '#ea6f5a',
    fontWeight: 700,
    borderBottom: '2px solid #ea6f5a',
  };
  return (
    <Box display="flex" bg="#f1f1f1" h="100vh" alignItems="center">
      <Box position="absolute" left="50px" top="56px" w="100px">
        <Image src={jsLogo} />
      </Box>
      <HStack
        w="820px"
        h="600px"
        mx="auto"
        alignItems="start"
        justifyContent="space-between"
      >
        <VStack pl="45px" position="relative">
          <Image src={jsSlogan} w="328px" />
          <Box
            position="absolute"
            left="60px"
            top="452px"
            display="flex"
            alignItems="center"
          >
            <Center
              w="252px"
              h="46px"
              borderRadius="46px"
              bg="#ea6f5a"
              color="#fff"
              fontSize="18px"
              mr="15px"
            >
              下载简书APP
            </Center>
            <Center w="46px" h="46px" borderRadius="5px" bg="#fff">
              <Image src={qr} w="36px" h="36px" />
            </Center>
          </Box>
        </VStack>
        <Flex
          direction="column"
          align="center"
          w="400px"
          bg="#fff"
          padding="50px 50px 30px"
          borderRadius="4px"
          boxShadow="0 0 8px rgb(0 0 0 / 10%)"
        >
          <HStack fontSize="18px" color="#969696" mb="50px">
            <Text
              p="10px"
              cursor="pointer"
              onClick={handleChangeTab.bind(null, 'login')}
              style={currentTab === 'login' ? activeStyle : {}}
              _hover={
                currentTab === 'login'
                  ? {}
                  : { borderBottom: '2px solid #ea6f5a', pb: '8px' }
              }
            >
              登陆
            </Text>
            <Text>·</Text>
            <Text
              p="10px"
              cursor="pointer"
              onClick={handleChangeTab.bind(null, 'register')}
              style={currentTab === 'register' ? activeStyle : {}}
              _hover={
                currentTab === 'register'
                  ? {}
                  : { borderBottom: '2px solid #ea6f5a', pb: '8px' }
              }
            >
              注册
            </Text>
          </HStack>
          {currentTab === 'login' ? <Login /> : <Register />}
        </Flex>
      </HStack>
    </Box>
  );
}

export default App;
