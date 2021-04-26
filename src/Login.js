import React, { useState } from 'react';
import {
  Box,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Button,
  useToast,
} from '@chakra-ui/react';
import { HiUser, HiLockClosed, HiExclamation } from 'react-icons/hi';
import { FaWeibo, FaWeixin, FaQq } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Login() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const validateSchema = Yup.object().shape({
    email: Yup.string().email('无效的邮箱').required('请输入正确的邮箱号'),
    password: Yup.string().min(8, '密码不能少于8个字符').required('请输入密码'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      setLoading(true);
      axios
        .post('https://conduit.productionready.io/api/users/login', {
          user: values,
        })
        .then(res => {
          setLoading(false);
          toast({
            title: '登陆成功',
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
      onSubmit={formik.handleSubmit}
      style={{ width: '100%', textAlign: 'center' }}
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
            type="email"
            h="50px"
            fontSize="13px"
            placeholder="手机号或邮箱"
            focusBorderColor="inherit"
            border="none"
            borderBottom="1px solid #c8c8c8"
            borderRadius="0px"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <Box
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
            focusBorderColor="inherit"
            border="none"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <Box
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
      <HStack w="100%" justifyContent="space-between" my="15px">
        <Checkbox size="sm" defaultChecked fontSize="13px">
          记住我
        </Checkbox>
        <Text fontSize="13px">登陆遇到问题？</Text>
      </HStack>
      <Button
        w="100%"
        borderRadius="30px"
        bg="#3194d0"
        color="#fff"
        _hover={{ bg: '#187cb7' }}
        type="submit"
        isLoading={loading}
      >
        登录
      </Button>
      <HStack spacing="50px" mt="50px" mb="10px" justifyContent="center">
        <Text fontSize="12px">社交账号登录</Text>
      </HStack>
      <HStack spacing="30px" mt="20px" justifyContent="center">
        <FaWeibo color="#e95244" fontSize="25px" cursor="pointer" />
        <FaWeixin color="#00bb29" fontSize="28px" cursor="pointer" />
        <FaQq color="#498ad5" fontSize="24px" cursor="pointer" />
      </HStack>
    </form>
  );
}
