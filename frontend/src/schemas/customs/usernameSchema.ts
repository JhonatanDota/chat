import { z } from "zod";

import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../../rules/api/userRules";

export const usernameSchema = z.string().superRefine((value, ctx) => {
  if (!value.length) {
    ctx.addIssue({
      code: "custom",
      message: "O username é obrigatório",
    });
    return;
  }

  if (value.length < USERNAME_MIN_LENGTH) {
    ctx.addIssue({
      code: "custom",
      message: `O username deve ter pelo menos ${USERNAME_MIN_LENGTH} caracteres`,
    });
  }

  if (value.length > USERNAME_MAX_LENGTH) {
    ctx.addIssue({
      code: "custom",
      message: `O username deve ter no máximo ${USERNAME_MAX_LENGTH} caracteres`,
    });
  }

  if (!/^[a-z]/.test(value)) {
    ctx.addIssue({
      code: "custom",
      message: "O username deve começar com uma letra minúscula",
    });
  }

  if (!/^[a-z0-9._]+$/.test(value)) {
    ctx.addIssue({
      code: "custom",
      message:
        "O username pode conter apenas letras minúsculas, números, ponto (.) e underline (_)",
    });
  }

  if (/[._]$/.test(value)) {
    ctx.addIssue({
      code: "custom",
      message: "O username não pode terminar com ponto ou underline",
    });
  }

  if (/[._][._]/.test(value)) {
    ctx.addIssue({
      code: "custom",
      message:
        "O username não pode conter dois caracteres especiais consecutivos",
    });
  }
});
