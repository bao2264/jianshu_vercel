import React, { useState } from 'react';
import {
  Box,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Link,
  useToast,
} from '@chakra-ui/react';
import { HiUser, HiLockClosed, HiPhone, HiExclamation } from 'react-icons/hi';
import { FaWeixin, FaQq } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Register() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const validateSchema = Yup.object().shape({
    username: Yup.string().required('请输入昵称'),
    email: Yup.string().email('无效的邮箱').required('请输入正确的邮箱号'),
    password: Yup.string().min(8, '密码不能少于8个字符').required('请输入密码'),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: values => {
      setLoading(true);
      axios
        .post('https://conduit.productionready.io/api/users', { user: values })
        .then(res => {
          setLoading(false);
          toast({
            title: '注册成功',
            status: 'success',
            isClosable: true,
            duration: 2000,
            position: 'top',
          });
        })
        .catch(err => {
          setLoading(false);
          const {
            response: {
              data: { errors },
            },
          } = err;
          console.dir(Object.entries(errors));
          Object.entries(errors).forEach(([key, arr], index) => {
            arr.forEach(v => {
              toast({
                title: `${key} ${v}`,
                status: 'error',
                isClosable: true,
                duration: 2000,
                position: 'top',
              });
            });
          });
        });
    },
    validationSchema: validateSchema,
  });
  return (
    <form
      style={{ width: '100%', textAlign: 'center' }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        border="1px solid #c8c8c8"
        borderRadius="4px"
        bg="rgba(181,181,181,0.1)"
        w="100%"
      >
        <InputGroup pos="relative">
          <InputLeftElement h="50px" children={<HiUser />} />
          <Input
            type="text"
            h="50px"
            fontSize="13px"
            placeholder="你的昵称"
            name="username"
            focusBorderColor="inherit"
            border="none"
            borderBottom="1px solid #c8c8c8"
            borderRadius="0px"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <Box
              w="280p"
              py="5px"
              px="10px"
              border="1px solid #ea6f5a"
              pos="absolute"
              left="310px"
              right="-280px"
              top="50%"
              transform="translateY(-50%)"
              bg="#fff"
              borderRadius="4px"
              display="flex"
              alignItems="center"
              fontSize="14px"
            >
              <HiExclamation fontSize="20px" color="#ea6f5a" />
              <Text as="span">{formik.errors.username}</Text>
            </Box>
          ) : null}
        </InputGroup>
        <InputGroup pos="relative">
          <InputLeftElement h="50px" children={<HiPhone />} />
          <Input
            type="email"
            h="50px"
            fontSize="13px"
            placeholder="邮箱"
            name="email"
            focusBorderColor="inherit"
            borderBottom="1px solid #c8c8c8"
            border="none"
            borderRadius="0px"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <Box
              w="280p"
              py="5px"
              px="10px"
              border="1px solid #ea6f5a"
              pos="absolute"
              left="310px"
              right="-280px"
              top="50%"
              transform="translateY(-50%)"
              bg="#fff"
              borderRadius="4px"
              display="flex"
              alignItems="center"
              fontSize="14px"
            >
              <HiExclamation fontSize="20px" color="#ea6f5a" />
              <Text as="span">{formik.errors.email}</Text>
            </Box>
          ) : null}
        </InputGroup>
        <InputGroup pos="relative">
          <InputLeftElement h="50px" children={<HiLockClosed />} />
          <Input
            type="password"
            h="50px"
            fontSize="13px"
            placeholder="密码"
            name="password"
            focusBorderColor="inherit"
            border="none"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <Box
              w="280p"
              py="5px"
              px="10px"
              border="1px solid #ea6f5a"
              pos="absolute"
              left="310px"
              right="-280px"
              top="50%"
              transform="translateY(-50%)"
              bg="#fff"
              borderRadius="4px"
              display="flex"
              alignItems="center"
              fontSize="14px"
            >
              <HiExclamation fontSize="20px" color="#ea6f5a" />
              <Text as="span">{formik.errors.password}</Text>
            </Box>
          ) : null}
        </InputGroup>
      </Box>
      <Button
        w="100%"
        borderRadius="30px"
        bg="#42c02e"
        color="#fff"
        _hover={{ bg: '#3db922' }}
        mt="20px"
        mb="10px"
        type="submit"
        isLoading={loading}
      >
        注册
      </Button>
      <Text fontSize="12px" lineHeight="20px">
        点击 “注册” 即表示您同意并愿意遵守简书
      </Text>
      <Text fontSize="12px" lineHeight="20px">
        <Link color="#3194d0">用户协议</Link>&nbsp;和&nbsp;
        <Link color="#3194d0">隐私政策</Link>
      </Text>
      <HStack spacing="50px" mt="50px" mb="10px" justifyContent="center">
        <Text fontSize="12px">社交账号直接注册</Text>
      </HStack>
      <HStack spacing="30px" mt="20px" justifyContent="center">
        <FaWeixin color="#00bb29" fontSize="28px" cursor="pointer" />
        <FaQq color="#498ad5" fontSize="24px" cursor="pointer" />
      </HStack>
    </form>
  );
}
