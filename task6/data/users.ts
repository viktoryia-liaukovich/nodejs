export interface UserEntity {
  id: string;
}

//
// Temprorary user storage until task 9 (Auth and Registration)
//
const userIds = [ '0fe36d16-49bc-4aab-a227-f84df899a6cb', '507a6a0e-e2ed-49f6-9b46-e65939d28da3', '9c4cd803-1fe1-44e9-a6a6-552d0c00d1f5', 'c6dda68d-88ad-45cf-996c-2e6c3ae965ee' ];

export const users = userIds.reduce<Record<string, UserEntity>>((acc, id) => {
  acc[id] = {
    id
  }
  return acc;
}, {});

