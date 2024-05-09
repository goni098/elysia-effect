import type { GetIdoFormsQuery } from "@root/modules/admin/parsers/getIdoForms";
import type { SubmitIdoFormPayload } from "@root/modules/project/parsers/submitIdoForm";
import { prisma } from "@root/shared/prisma";

export abstract class IdoFormRepository {
  static create(payload: SubmitIdoFormPayload) {
    return prisma.idoForm.create({
      data: {
        name: payload.name,
        website: payload.website,
        shortDescription: payload.shortDescription,
        whitepaper: payload.whitepaper,
        tokenomicsLink: payload.tokenomicsLink,
        smartContractAudit: payload.smartContractAudit,
        contactEmail: payload.contactEmail,
        teamMember: payload.teamMember,
        telegram: payload.telegram,
        developmentStage: payload.developmentStage,
        roadmap: payload.roadmap,
        previousFunding: payload.previousFunding,
        choiceReason: payload.choiceReason,
        additionalComment: payload.additionalComment
      }
    });
  }

  static findPaged({ page, take, status }: GetIdoFormsQuery) {
    return Promise.all([
      prisma.idoForm.findMany({
        where: {
          status
        },
        take,
        skip: (page - 1) * take
      }),
      prisma.idoForm.count({
        where: {
          status
        }
      })
    ]);
  }
}
