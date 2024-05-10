import { GetIdoFormsParams } from "@root/apis/admin/get-ido-forms";
import { DatabaseError } from "@root/errors";
import { prisma } from "@root/shared/prisma";
import { Effect } from "effect";

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

  static find({ page, take, status }: GetIdoFormsParams) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () =>
        Promise.all([
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
        ])
    });
  }
}
