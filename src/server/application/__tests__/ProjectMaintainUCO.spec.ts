import faker from 'faker';
import ProjectMaintainUCO from '../ProjectMaintainUCO';
import { TestUserUtils } from '../../../test/utils/TestUserUtil';
import { TimeUtil } from '../../utils/TimeUtil';
import { ProjectDTO } from '../../domain/project/ProjectDTO';

async function generateProjectCode(vo: any): Promise<string> {
    return await new ProjectMaintainUCO()
        .generateProjectCode(vo)
        .then((result) => {
            console.log(result);
            return result.code
        })
        .catch((err) => {
            console.log(err);
            return ""
        });
}

async function createProject(): Promise<ProjectDTO> {
    const operator = await TestUserUtils.GetSkyMapAdmin();
    const code = await generateProjectCode({});

    const vo = {
        cloud_code_id: 1,
        code: code,
        expire_date: TimeUtil.now().add(3, "M").valueOf(),
        name: `${faker.company.companyName()}_${TimeUtil.now()}`.replace(" ", ""),
        owner_id: operator.id
    };

    return await new ProjectMaintainUCO()
        .create(vo)
        .then((result) => {
            console.log(result);
            return result
        })
        .catch((err) => {
            console.log(err);
            return null
        });
}

describe('Project Maintain UseCase', () => {
    beforeAll(() => { });

    afterAll(() => { });

    describe('GET /api/project/code/generate', () => {

        test('should created a project', async () => {
            const vo = {};
            const code = await generateProjectCode(vo);
            expect(code).not.toBeNull();
        });
    });

    describe('POST /api/projects', () => {

        test('should created a project', async () => {
            const project = await createProject();
            expect(project).not.toBeNull();
        });
    });

    describe('GET /api/projects', () => {

        test('should return the project', async () => {

            const project = await createProject();
            const vo = {
                id: project.id,
            };

            await new ProjectMaintainUCO()
                .get(vo)
                .then((result) => {
                    console.log(result);
                    expect(result.id).toEqual(project.id);
                })
                .catch((err) => {
                    console.log(err);
                    expect(err).toBeNull();
                });
        });

        test('should return projects', async () => {

            const vo = {
                offset: 0,
                limit: 10,
            };

            await new ProjectMaintainUCO()
                .query(vo)
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                    expect(err).toBeNull();
                });
        });
    });
});
