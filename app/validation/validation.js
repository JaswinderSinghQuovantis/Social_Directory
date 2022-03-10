import Joi from 'joi';

class Validation {
    ValidationRegister = Joi.object({
        email: Joi.string()
            .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
            .required(),

        password: Joi.string()
            .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
            .required(),

        phoneNo: Joi.string()
            .pattern(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/)
            .required()
    });
    ValidationLogin = Joi.object({
        email: Joi.string()
            .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
            .required(),

        password: Joi.string()
            .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
            .required()
    })
    ValiidatingProfile = Joi.object({
        email: Joi.string()
            .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
            .required(),
        name: Joi.string()
            .required(),
        dob: Joi.string()
            .required(),

        interest: Joi.array()
            .required(),

        location: Joi.string()
            .required()
    });
    ValidatingInterests=Joi.object({
        interest : Joi.array()
        .items({
            Sport: Joi.string()
              .required(),
            Cultural: Joi.string()
              .required(),
              Carrier: Joi.string()
              .required(),
          }),
    })
}

export default new Validation();