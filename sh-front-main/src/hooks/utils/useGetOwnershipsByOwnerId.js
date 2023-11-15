import { useQuery } from '@apollo/client';
import { GET_OWNERSHIPS_BY_OWNER_ID } from "client/gql/queries/utils";
import { useGetOwnerId } from "hooks/utils/useGetOwnerId";
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { DELETE_OWNERSHIP, UPDATE_OWNERSHIP } from 'client/gql/queries/delete/deleteOwnershipById';

export function useGetOwnershipsByOwnerId() {

    const { owner_id } = useGetOwnerId();

    const [editingOwnership, setEditingOwnership] = useState(null);

    let variables = { "owner_id": owner_id };

    const { loading, error, data: ownerships, refetch } = useQuery(GET_OWNERSHIPS_BY_OWNER_ID, { variables });

    const [deleteOwnership] = useMutation(DELETE_OWNERSHIP, {
        onCompleted: () => {
            // Refetch the data after deletion
            refetch();
        },
        onError: (error) => {
            console.error(error);
            // Handle error as needed
        },
    });
    

    return { loading, error, ownerships: ownerships?.sh_ownerships, deleteOwnership };
}