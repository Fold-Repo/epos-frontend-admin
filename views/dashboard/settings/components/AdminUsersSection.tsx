"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Chip } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LuPencilLine, LuPlus, LuUsers } from "react-icons/lu";
import { DashboardCard, FilterBar, Pagination, TableComponent } from "@/components";
import { createInputLabel, Input, PopupModal, TableCell } from "@/components/ui";
import { useToast } from "@/hooks";
import { client } from "@/lib";
import { getErrorMessage } from "@/utils";
import * as yup from "yup";

type AdminRole = "admin" | "business" | "support";
type AdminStatus = "active" | "suspended";

type AdminUserApiRow = {
  user_id?: number;
  userId?: number;
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  altphone: string | null;
  position: string | null;
  isVerify: boolean;
  is_suspended: boolean;
  suspended_at: string | null;
  created_at: string;
  updated_at?: string;
  role_id: number;
  role_name: AdminRole;
  role_description?: string;
};

type AdminUsersResponse = {
  status: number;
  message: string;
  data: AdminUserApiRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type AdminUserForm = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
};

type CreateAdminPayload = AdminUserForm & { role: "admin" };

const emptyForm: AdminUserForm = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
};

type MutationResponse = {
  status: number;
  message: string;
};

const adminUserSchema = yup.object({
  firstname: yup.string().trim().required("Firstname is required"),
  lastname: yup.string().trim().required("Lastname is required"),
  email: yup.string().trim().email("Enter a valid email address").required("Email is required"),
  phone: yup.string().trim().min(8, "Phone number is too short").required("Phone number is required"),
  password: yup.string().defined().trim().test({
    name: "password-min-length",
    message: "Password must be at least 6 characters",
    test: (value) => !value || value.length >= 6,
  }),
});

export default function AdminUsersSection() {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToast();

  const [page, setPage] = useState(1);
  const limit = 20;
  const [search, setSearch] = useState("");
  const query = search.trim();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserApiRow | null>(null);
  const [deletingUser, setDeletingUser] = useState<AdminUserApiRow | null>(null);
  const [statusActionUserId, setStatusActionUserId] = useState<number | null>(null);
  const [deleteActionUserId, setDeleteActionUserId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm<AdminUserForm>({
    resolver: yupResolver(adminUserSchema),
    mode: "onChange",
    defaultValues: emptyForm,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users-admins", page, limit, query],
    queryFn: async () => {
      const response = await client.get<AdminUsersResponse>("/admin/users/admins", {
        params: {
          page,
          limit,
          ...(query ? { search: query } : {}),
        },
      });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const users = useMemo(() => data?.data ?? [], [data]);
  const totalItems = data?.pagination.total ?? 0;
  const totalPages = Math.max(1, data?.pagination.totalPages ?? 1);
  const getUserId = (user: AdminUserApiRow) => user.user_id ?? user.userId ?? user.id ?? null;
  const passwordValue = watch("password");

  const invalidateAdminUsers = () =>
    queryClient.invalidateQueries({
      queryKey: ["admin-users-admins"],
    });

  const createUserMutation = useMutation({
    mutationFn: async (payload: CreateAdminPayload) => {
      const response = await client.post<MutationResponse>("/admin/users", payload);
      return response.data;
    },
    onSuccess: (response) => {
      showSuccess(response.message || "User created successfully");
      setIsModalOpen(false);
      reset(emptyForm);
      void invalidateAdminUsers();
    },
    onError: (error) => showError(getErrorMessage(error)),
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, payload }: { userId: number; payload: Partial<AdminUserForm> }) => {
      const response = await client.patch<MutationResponse>(`/admin/users/${userId}`, payload);
      return response.data;
    },
    onSuccess: (response) => {
      showSuccess(response.message || "User updated successfully");
      setIsModalOpen(false);
      setEditingUser(null);
      reset(emptyForm);
      void invalidateAdminUsers();
    },
    onError: (error) => showError(getErrorMessage(error)),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await client.delete<MutationResponse>(`/admin/users/${userId}`);
      return response.data;
    },
    onSuccess: (response) => {
      showSuccess(response.message || "User deleted successfully");
      setDeletingUser(null);
      void invalidateAdminUsers();
    },
    onError: (error) => showError(getErrorMessage(error)),
    onSettled: () => setDeleteActionUserId(null),
  });

  const activateUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await client.patch<MutationResponse>(`/admin/users/${userId}/activate`);
      return response.data;
    },
    onSuccess: (response) => {
      showSuccess(response.message || "User activated successfully");
      void invalidateAdminUsers();
    },
    onError: (error) => showError(getErrorMessage(error)),
    onSettled: () => setStatusActionUserId(null),
  });

  const suspendUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await client.patch<MutationResponse>(`/admin/users/${userId}/suspend`);
      return response.data;
    },
    onSuccess: (response) => {
      showSuccess(response.message || "User suspended successfully");
      void invalidateAdminUsers();
    },
    onError: (error) => showError(getErrorMessage(error)),
    onSettled: () => setStatusActionUserId(null),
  });

  const openAddModal = () => {
    setEditingUser(null);
    reset(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (user: AdminUserApiRow) => {
    setEditingUser(user);
    reset({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: "",
      phone: user.phone,
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = (formData: AdminUserForm) => {
    if (!editingUser && !formData.password.trim()) {
      setError("password", { type: "manual", message: "Password is required" });
      return;
    }

    if (editingUser) {
      const userId = getUserId(editingUser);
      if (!userId) return;
      const payload: Partial<AdminUserForm> = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
      };
      if (formData.password.trim()) payload.password = formData.password;
      updateUserMutation.mutate({ userId, payload });
      return;
    }

    createUserMutation.mutate({
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: "admin",
    });
  };

  const handleToggleStatus = (user: AdminUserApiRow) => {
    const userId = getUserId(user);
    if (!userId) return;
    setStatusActionUserId(userId);
    if (user.is_suspended) {
      activateUserMutation.mutate(userId);
      return;
    }

    suspendUserMutation.mutate(userId);
  };

  const handleDeleteUser = () => {
    if (!deletingUser) return;
    const userId = getUserId(deletingUser);
    if (!userId) return;
    setDeleteActionUserId(userId);
    deleteUserMutation.mutate(userId);
  };

  return (
    <>
      <DashboardCard
        title="Admin users"
        icon={<LuUsers className="size-5 text-epos-text-secondary" />}
        bodyClassName="space-y-4"
      >
        <FilterBar
          searchInput={{
            placeholder: "Search by firstname, lastname, email, phone",
            className: "w-full md:w-80",
            onSearch: (value) => {
              setSearch(value);
              setPage(1);
            },
          }}
          items={[]}
          endContent={
            <Button
              color="primary"
              size="sm"
              startContent={<LuPlus className="size-4" />}
              onPress={openAddModal}
            >
              Add admin
            </Button>
          }
        />

        <TableComponent
          className="overflow-hidden rounded-xl border border-gray-200"
          columns={[
            { key: "name", title: "Name" },
            { key: "email", title: "Email" },
            { key: "phone", title: "Phone" },
            { key: "role", title: "Role" },
            { key: "status", title: "Status" },
            { key: "actions", title: "" },
          ]}
          data={users}
          loading={isLoading}
          rowKey={(row) => String(getUserId(row) ?? `missing-id-${row.email}`)}
          renderRow={(row) => (
            <>
              <TableCell>
                <span className="text-xs font-medium text-epos-text-primary">
                  {row.firstname} {row.lastname}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-xs text-epos-text-secondary">{row.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-xs text-epos-text-secondary">{row.phone}</span>
              </TableCell>
              <TableCell>
                <span className="text-xs capitalize text-epos-text-primary">{row.role_name}</span>
              </TableCell>
              <TableCell>
                {(() => {
                  const status: AdminStatus = row.is_suspended ? "suspended" : "active";
                  return (
                    <Chip
                      size="sm"
                      variant="flat"
                      className={`text-[11px] ${
                        status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {status}
                    </Chip>
                  );
                })()}
              </TableCell>
              <TableCell className="w-px whitespace-nowrap">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    className="h-7 min-w-0 bg-primary-100 px-3 text-[11px] font-medium text-primary-700"
                    startContent={<LuPencilLine className="size-3.5" />}
                    onPress={() => openEditModal(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    className={`h-7 min-w-0 px-3 text-[11px] font-medium ${
                      row.is_suspended ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                    onPress={() => handleToggleStatus(row)}
                    isLoading={getUserId(row) !== null && statusActionUserId === getUserId(row)}
                  >
                    {row.is_suspended ? "Activate" : "Suspend"}
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    className="h-7 min-w-0 px-3 text-[11px] font-medium"
                    onPress={() => setDeletingUser(row)}
                    isLoading={getUserId(row) !== null && deleteActionUserId === getUserId(row)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </>
          )}
        />

        <Pagination
          currentPage={Math.min(page, totalPages)}
          totalItems={totalItems}
          itemsPerPage={limit}
          onPageChange={setPage}
          showingText="Admins"
        />
      </DashboardCard>

      <PopupModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
          reset(emptyForm);
        }}
        title={editingUser ? "Edit admin user" : "Add admin user"}
        description={
          editingUser ? "Update admin user details." : "Create a new admin user from this panel."
        }
        size="2xl"
        footer={
          <div className="flex w-full items-center justify-end gap-2">
            <Button
              variant="light"
              onPress={() => {
                setIsModalOpen(false);
                setEditingUser(null);
                reset(emptyForm);
              }}
              isDisabled={createUserMutation.isPending || updateUserMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={() => {
                const form = document.getElementById("admin-user-form") as HTMLFormElement | null;
                form?.requestSubmit();
              }}
              isDisabled={!isValid || (!editingUser && !passwordValue?.trim())}
              isLoading={createUserMutation.isPending || updateUserMutation.isPending}
            >
              {editingUser ? "Update admin" : "Create admin"}
            </Button>
          </div>
        }
      >
        <form id="admin-user-form" onSubmit={handleSubmit(handleSaveUser)}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              label={createInputLabel({ name: "Firstname", required: true })}
              placeholder="Enter firstname"
              {...register("firstname")}
              error={errors.firstname?.message}
            />
            <Input
              label={createInputLabel({ name: "Lastname", required: true })}
              placeholder="Enter lastname"
              {...register("lastname")}
              error={errors.lastname?.message}
            />
            <Input
              label={createInputLabel({ name: "Email", required: true })}
              type="email"
              placeholder="Enter email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label={createInputLabel({ name: "Phone", required: true })}
              placeholder="Enter phone number"
              {...register("phone")}
              error={errors.phone?.message}
            />
            <Input
              label={createInputLabel({ name: "Password", required: true })}
              type="password"
              placeholder="Enter password"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>
        </form>
      </PopupModal>

      <PopupModal
        isOpen={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        title="Delete admin user"
        description="This action cannot be undone."
        size="md"
        footer={
          <div className="flex w-full items-center justify-end gap-2">
            <Button
              variant="light"
              onPress={() => setDeletingUser(null)}
              isDisabled={deleteUserMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleDeleteUser}
              isLoading={deleteUserMutation.isPending}
            >
              Delete user
            </Button>
          </div>
        }
      >
        <p className="text-sm text-epos-text-secondary">
          Are you sure you want to delete{" "}
          <span className="font-medium text-epos-text-primary">
            {deletingUser?.firstname} {deletingUser?.lastname}
          </span>
          ?
        </p>
      </PopupModal>
    </>
  );
}
